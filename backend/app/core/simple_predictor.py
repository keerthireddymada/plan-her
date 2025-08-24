from datetime import date, datetime, timedelta
from sqlalchemy.orm import Session
from ..models.profile import UserProfile
from ..models.period import PeriodRecord
import random


class SimplePredictor:
    @staticmethod
    def predict_next_period(user_id: int, db: Session) -> date:
        """
        Simple mathematical model to predict next period date
        """
        # Get user profile
        profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
        if not profile:
            raise ValueError("User profile not found")
        
        # Get the most recent period
        latest_period = db.query(PeriodRecord).filter(
            PeriodRecord.user_id == user_id
        ).order_by(PeriodRecord.start_date.desc()).first()
        
        if not latest_period:
            # Use the last_period_start from profile if no period records exist
            base_date = profile.last_period_start
        else:
            base_date = latest_period.start_date
        
        # Calculate next period date
        next_period_date = base_date + timedelta(days=profile.cycle_length)
        
        # Add variance for irregular periods
        if profile.period_regularity == "irregular":
            variance = random.randint(-3, 3)
            next_period_date += timedelta(days=variance)
        
        return next_period_date

    @staticmethod
    def predict_mood(user_id: int, target_date: date, db: Session) -> str:
        """
        Simple mood prediction based on cycle phase
        """
        cycle_day = SimplePredictor.calculate_cycle_day(user_id, target_date, db)
        
        # Simple phase-based mood prediction
        if cycle_day <= 5:  # Menses phase
            return "low"  # Lower energy
        elif cycle_day <= 14:  # Follicular phase
            return "high"  # Higher energy
        elif cycle_day <= 21:  # Ovulation
            return "high"  # Peak energy
        else:  # Luteal phase
            return "medium"  # Moderate energy

    @staticmethod
    def calculate_cycle_day(user_id: int, target_date: date, db: Session) -> int:
        """
        Calculate the day of cycle for a given date
        """
        # Get user profile
        profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
        if not profile:
            raise ValueError("User profile not found")
        
        # Get all period records for the user
        periods = db.query(PeriodRecord).filter(
            PeriodRecord.user_id == user_id,
            PeriodRecord.start_date <= target_date
        ).order_by(PeriodRecord.start_date.desc()).all()
        
        if not periods:
            # If no period records, use the last_period_start from profile
            last_period_start = profile.last_period_start
        else:
            # Find the most recent period start date before or on the target date
            last_period_start = None
            for period in periods:
                if period.start_date <= target_date:
                    last_period_start = period.start_date
                    break
        
        if not last_period_start:
            raise ValueError("No period start date found before target date")
        
        # Calculate day of cycle
        day_of_cycle = (target_date - last_period_start).days + 1
        
        return day_of_cycle

    @staticmethod
    def calculate_cycle_phase(day_of_cycle: int, cycle_length: int, luteal_length: int) -> str:
        """
        Calculate the cycle phase based on day of cycle
        """
        ovulation_day = cycle_length - luteal_length - 1
        
        if day_of_cycle <= 5:
            return "Menses"
        elif day_of_cycle <= ovulation_day:
            return "Follicular"
        elif day_of_cycle <= cycle_length:
            return "Luteal"
        else:
            return "Next Cycle"

    @staticmethod
    def calculate_days_until_next_period(user_id: int, db: Session) -> int:
        """
        Calculate days until next period
        """
        try:
            next_period_date = SimplePredictor.predict_next_period(user_id, db)
            today = date.today()
            days_until = (next_period_date - today).days
            return max(0, days_until)
        except ValueError:
            return None

    @staticmethod
    def get_prediction(user_id: int, target_date: date, db: Session) -> dict:
        """
        Get complete prediction for a user
        """
        try:
            # Calculate cycle day
            cycle_day = SimplePredictor.calculate_cycle_day(user_id, target_date, db)
            
            # Get user profile for cycle phase calculation
            profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
            if not profile:
                raise ValueError("User profile not found")
            
            # Calculate cycle phase
            cycle_phase = SimplePredictor.calculate_cycle_phase(
                cycle_day, profile.cycle_length, profile.luteal_length
            )
            
            # Predict mood
            predicted_mood = SimplePredictor.predict_mood(user_id, target_date, db)
            
            # Calculate days until next period
            days_until_next = SimplePredictor.calculate_days_until_next_period(user_id, db)
            
            return {
                "day_of_cycle": cycle_day,
                "cycle_phase": cycle_phase,
                "predicted_mood": predicted_mood,
                "next_period_in_days": days_until_next,
                "confidence": 0.85  # Simple confidence score
            }
            
        except Exception as e:
            raise ValueError(f"Prediction failed: {str(e)}")
