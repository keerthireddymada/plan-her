from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ProfileBase(BaseModel):
    height_cm: Optional[int] = Field(None, ge=100, le=250)
    weight_kg: Optional[float] = Field(None, ge=30, le=200)
    cycle_length: Optional[int] = Field(None, ge=20, le=40)
    luteal_length: Optional[int] = Field(None, ge=10, le=20)
    menses_length: Optional[int] = Field(None, ge=2, le=10)
    unusual_bleeding: Optional[bool] = False
    number_of_peak: Optional[int] = Field(2, ge=1, le=5)


class ProfileCreate(ProfileBase):
    pass


class ProfileUpdate(ProfileBase):
    pass


class ProfileResponse(ProfileBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
