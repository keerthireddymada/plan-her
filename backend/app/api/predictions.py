from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date, datetime
from ..database import get_db
from ..models.user import User
from ..models.mood import DailyMood
from ..schemas.prediction import PredictionResponse
from ..core.security import get_current_active_user
from ..core.ml_model import (
    make_prediction,
    train_model,
    save_model,
    should_retrain_model,
    load_model
)
from ..core.cycle_calculator import (
    calculate_day_of_cycle,
    calculate_cycle_phase,
    calculate_days_until_next_period,
    get_cycle_statistics
)

router = APIRouter()


@router.get("/current", response_model=PredictionResponse)
async def get_current_prediction(
    target_date: Optional[date] = None,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get current prediction for today or specified date
    """
    if target_date is None:
        target_date = date.today()
    
    try:
        # Try to make ML prediction
        prediction = make_prediction(current_user.id, target_date, db)
        return PredictionResponse(**prediction)
    except ValueError as e:
        # If ML prediction fails, provide basic cycle info
        try:
            day_of_cycle = calculate_day_of_cycle(current_user.id, target_date, db)
            
            # Get user profile for cycle phase calculation
            from ..models.profile import UserProfile
            profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
            
            if profile:
                cycle_phase = calculate_cycle_phase(day_of_cycle, profile.cycle_length, profile.luteal_length)
                days_until_next = calculate_days_until_next_period(current_user.id, db)
                
                return PredictionResponse(
                    day_of_cycle=day_of_cycle,
                    cycle_phase=cycle_phase,
                    predicted_mood="medium",  # Default when no ML model
                    next_period_in_days=days_until_next
                )
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User profile not found. Please create a profile first."
                )
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            )


@router.post("/confirm-period")
async def confirm_period(
    period_date: date,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Confirm period start date and automatically retrain model
    """
    try:
        # Create period record
        from ..models.period import PeriodRecord
        from ..schemas.period import PeriodCreate
        
        period_data = PeriodCreate(
            start_date=period_date,
            end_date=None,
            flow_intensity="medium"
        )
        
        # Check if period record already exists for this date
        existing_period = db.query(PeriodRecord).filter(
            PeriodRecord.user_id == current_user.id,
            PeriodRecord.start_date == period_date
        ).first()
        
        if existing_period:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Period record already exists for this date"
            )
        
        # Create new period record
        db_period = PeriodRecord(
            user_id=current_user.id,
            **period_data.dict()
        )
        
        db.add(db_period)
        db.commit()
        db.refresh(db_period)
        
        # Retrain model with new data
        try:
            model, accuracy = train_model(current_user.id, db)
            saved_model = save_model(current_user.id, model, accuracy, db)
            
            return {
                "message": "Period confirmed and model retrained successfully",
                "period_id": db_period.id,
                "model_accuracy": accuracy,
                "model_id": saved_model.id
            }
        except ValueError as e:
            # Model training failed, but period was saved
            return {
                "message": "Period confirmed successfully. Model retraining failed due to insufficient data.",
                "period_id": db_period.id,
                "model_error": str(e)
            }
            
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error confirming period: {str(e)}"
        )


@router.get("/history")
async def get_prediction_history(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get prediction history for a date range
    """
    if start_date is None:
        start_date = date.today() - datetime.timedelta(days=30)
    if end_date is None:
        end_date = date.today()
    
    predictions = []
    current_date = start_date
    
    while current_date <= end_date:
        try:
            prediction = make_prediction(current_user.id, current_date, db)
            predictions.append({
                "date": current_date.isoformat(),
                **prediction
            })
        except Exception:
            # Skip dates where prediction fails
            pass
        
        current_date += datetime.timedelta(days=1)
    
    return {
        "predictions": predictions,
        "total_predictions": len(predictions)
    }


@router.post("/retrain")
async def retrain_model(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Retrain the ML model for the current user
    """
    try:
        # Train new model
        model, accuracy = train_model(current_user.id, db)
        
        # Save model
        saved_model = save_model(current_user.id, model, accuracy, db)
        
        return {
            "message": "Model retrained successfully",
            "accuracy": accuracy,
            "model_id": saved_model.id,
            "created_at": saved_model.created_at
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retraining model: {str(e)}"
        )


@router.get("/model-status")
async def get_model_status(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get current model status and statistics
    """
    # Get latest model
    from ..models.model import UserModel
    latest_model = db.query(UserModel).filter(
        UserModel.user_id == current_user.id
    ).order_by(UserModel.created_at.desc()).first()
    
    # Get mood data statistics
    total_moods = db.query(DailyMood).filter(DailyMood.user_id == current_user.id).count()
    
    # Get cycle statistics
    cycle_stats = get_cycle_statistics(current_user.id, db)
    
    # Check if retraining is needed
    needs_retraining = should_retrain_model(current_user.id, db)
    
    return {
        "has_model": latest_model is not None,
        "model_accuracy": latest_model.accuracy_score if latest_model else None,
        "model_created_at": latest_model.created_at if latest_model else None,
        "total_mood_entries": total_moods,
        "cycle_statistics": cycle_stats,
        "needs_retraining": needs_retraining,
        "retrain_threshold": 10  # From settings
    }


@router.get("/cycle-info")
async def get_cycle_information(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get detailed cycle information
    """
    try:
        today = date.today()
        day_of_cycle = calculate_day_of_cycle(current_user.id, today, db)
        days_until_next = calculate_days_until_next_period(current_user.id, db)
        cycle_stats = get_cycle_statistics(current_user.id, db)
        
        # Get user profile for cycle phase
        from ..models.profile import UserProfile
        profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
        
        cycle_phase = None
        if profile:
            cycle_phase = calculate_cycle_phase(day_of_cycle, profile.cycle_length, profile.luteal_length)
        
        return {
            "current_day_of_cycle": day_of_cycle,
            "current_cycle_phase": cycle_phase,
            "days_until_next_period": days_until_next,
            "cycle_statistics": cycle_stats
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
