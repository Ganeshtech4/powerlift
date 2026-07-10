"""
VTD schemas (Gallery-style)
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class VtdBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    content: str = Field(..., min_length=10)
    excerpt: Optional[str] = Field(None, max_length=500)
    category: Optional[str] = None
    tags: Optional[str] = None
    is_published: bool = False
    images: Optional[List[str]] = []
    thumbnail_url: Optional[str] = None
    author: Optional[str] = "Admin"
    location: Optional[str] = None
    event_date: Optional[str] = None


class VtdCreate(VtdBase):
    pass


class VtdUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=255)
    content: Optional[str] = Field(None, min_length=10)
    excerpt: Optional[str] = Field(None, max_length=500)
    category: Optional[str] = None
    tags: Optional[str] = None
    is_published: Optional[bool] = None
    images: Optional[List[str]] = None
    thumbnail_url: Optional[str] = None
    author: Optional[str] = None
    location: Optional[str] = None
    event_date: Optional[str] = None


class VtdResponse(BaseModel):
    id: str
    title: str
    slug: str
    content: str
    excerpt: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    thumbnail_url: Optional[str] = None
    images: Optional[List[str]] = []
    author: Optional[str] = "Admin"
    location: Optional[str] = None
    event_date: Optional[str] = None
    is_published: bool = False
    views: int = 0
    created_at: str
    updated_at: Optional[str] = None
    published_at: Optional[str] = None

    class Config:
        from_attributes = True


class VtdListResponse(BaseModel):
    id: str
    title: str
    slug: str
    excerpt: Optional[str] = None
    category: Optional[str] = None
    thumbnail_url: Optional[str] = None
    images: Optional[List[str]] = []
    is_published: bool = False
    views: int = 0
    created_at: str
    class Config:
        from_attributes = True
