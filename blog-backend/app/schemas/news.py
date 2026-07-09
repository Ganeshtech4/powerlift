"""
News Pydantic schemas
"""
from pydantic import BaseModel
from typing import Optional


class NewsBase(BaseModel):
    title: str
    description: Optional[str] = None
    image_url: str
    thumbnail_url: Optional[str] = None
    category: Optional[str] = "General"
    published_date: Optional[str] = None
    is_featured: Optional[bool] = False
    status: Optional[str] = "published"   # published | draft


class NewsCreate(NewsBase):
    pass


class NewsUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    category: Optional[str] = None
    published_date: Optional[str] = None
    is_featured: Optional[bool] = None
    status: Optional[str] = None


class NewsResponse(NewsBase):
    id: str
    slug: str
    created_at: str
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True
