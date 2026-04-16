"""
Partnership Pydantic schemas
"""
from typing import List, Optional

from pydantic import BaseModel, Field


class PartnershipBase(BaseModel):
    gym_name: str
    owner_name: Optional[str] = None
    location: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    logo_url: Optional[str] = None
    description: Optional[str] = None
    highlights: List[str] = Field(default_factory=list)
    order: int = 0
    is_active: bool = True


class PartnershipCreate(PartnershipBase):
    pass


class PartnershipUpdate(BaseModel):
    gym_name: Optional[str] = None
    owner_name: Optional[str] = None
    location: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    logo_url: Optional[str] = None
    description: Optional[str] = None
    highlights: Optional[List[str]] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class PartnershipResponse(PartnershipBase):
    id: str
    created_at: str
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True
