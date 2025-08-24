from sqlalchemy import Column, Integer, String, DateTime, Boolean, Numeric, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Physical measurements
    height_cm = Column(Integer)
    weight_kg = Column(Numeric(5, 2))
    
    # Cycle information
    cycle_length = Column(Integer)
    luteal_length = Column(Integer)
    menses_length = Column(Integer)
    unusual_bleeding = Column(Boolean, default=False)
    number_of_peak = Column(Integer, default=2)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="profile")

    def __repr__(self):
        return f"<UserProfile(id={self.id}, user_id={self.user_id}, cycle_length={self.cycle_length})>"
