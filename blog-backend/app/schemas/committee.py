"""
Committee Member Pydantic schemas
"""
from typing import List, Optional

from pydantic import BaseModel, Field


class CommitteeMemberBase(BaseModel):
    name: str
    role: str
    photo_url: Optional[str] = None
    certificate_urls: List[str] = Field(default_factory=list)
    phone: Optional[str] = None
    email: Optional[str] = None
    description: Optional[str] = None
    highlight: Optional[str] = None
    achievements: List[str] = Field(default_factory=list)
    leadership: Optional[str] = None
    philosophy: Optional[str] = None
    is_featured: bool = False
    order: int = 0
    is_active: bool = True


class CommitteeMemberCreate(CommitteeMemberBase):
    pass


class CommitteeMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    photo_url: Optional[str] = None
    certificate_urls: Optional[List[str]] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    description: Optional[str] = None
    highlight: Optional[str] = None
    achievements: Optional[List[str]] = None
    leadership: Optional[str] = None
    philosophy: Optional[str] = None
    is_featured: Optional[bool] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class CommitteeMemberResponse(CommitteeMemberBase):
    id: str
    created_at: str
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True
