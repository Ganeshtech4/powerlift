"""
VTD book schemas
"""
from typing import Optional, List

from pydantic import BaseModel


class VtdBookBase(BaseModel):
    title: str
    subtitle: Optional[str] = None
    quote: Optional[str] = None
    category: Optional[str] = None
    pdf_url: Optional[str] = None
    cover_image_url: Optional[str] = None
    images: Optional[List[str]] = []
    order: int = 0
    is_active: bool = True


class VtdBookCreate(VtdBookBase):
    pass


class VtdBookUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    quote: Optional[str] = None
    category: Optional[str] = None
    pdf_url: Optional[str] = None
    cover_image_url: Optional[str] = None
    images: Optional[List[str]] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class VtdBookResponse(VtdBookBase):
    id: str
    created_at: str
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True
