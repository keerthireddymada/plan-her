from pydantic import BaseModel
from typing import Optional


class PredictionResponse(BaseModel):
    day_of_cycle: int
    cycle_phase: str
    predicted_mood: str  # "low", "medium", "high"
    confidence_score: Optional[float] = None
    next_period_in_days: Optional[int] = None
