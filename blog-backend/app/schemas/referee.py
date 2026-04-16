"""
Referee Pydantic schemas
"""
from pydantic import BaseModel
from typing import Optional


class RefereeBase(BaseModel):
    name: str
    level: str  # "International", "National", "State"
    photo_url: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    certification_year: Optional[str] = None
    description: Optional[str] = None
    order: int = 0
    is_active: bool = True


class RefereeCreate(RefereeBase):
    pass


class RefereeUpdate(BaseModel):
    name: Optional[str] = None
    level: Optional[str] = None
    photo_url: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    certification_year: Optional[str] = None
    description: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class RefereeResponse(RefereeBase):
    id: str
    created_at: str
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True
