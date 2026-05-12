"""
Inkspire book schemas
"""
from typing import Optional

from pydantic import BaseModel


class InkspireBookBase(BaseModel):
    title: str
    subtitle: Optional[str] = None
    quote: Optional[str] = None
    category: Optional[str] = None
    pdf_url: Optional[str] = None
    cover_image_url: Optional[str] = None
    order: int = 0
    is_active: bool = True


class InkspireBookCreate(InkspireBookBase):
    pass


class InkspireBookUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    quote: Optional[str] = None
    category: Optional[str] = None
    pdf_url: Optional[str] = None
    cover_image_url: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class InkspireBookResponse(InkspireBookBase):
    id: str
    created_at: str
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True