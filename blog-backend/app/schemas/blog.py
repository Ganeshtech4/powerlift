"""
Pydantic schemas for Blog API
"""
from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime
from enum import Enum


class GalleryCategory(str, Enum):
    DISTRICT = "district"
    STATE = "state"
    NATIONALS = "nationals"
    INTERNATIONALS = "internationals"


class BlogBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    content: str = Field(..., min_length=10)
    excerpt: Optional[str] = Field(None, max_length=500)
    category: Optional[GalleryCategory] = None
    tags: Optional[str] = None  # Comma-separated
    is_published: bool = False


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=255)
    content: Optional[str] = Field(None, min_length=10)
    excerpt: Optional[str] = Field(None, max_length=500)
    category: Optional[GalleryCategory] = None
    tags: Optional[str] = None
    is_published: Optional[bool] = None


class BlogResponse(BlogBase):
    id: str
    slug: str
    s3_folder_path: str
    thumbnail_url: Optional[str]
    image_count: int
    author: str
    views: int
    created_at: datetime
    updated_at: Optional[datetime]
    published_at: Optional[datetime]


class BlogListResponse(BaseModel):
    id: str
    title: str
    slug: str
    excerpt: Optional[str]
    thumbnail_url: Optional[str]
    category: Optional[str]
    author: str
    views: int
    is_published: bool
    created_at: datetime
    published_at: Optional[datetime]


class ImageUploadResponse(BaseModel):
    filename: str
    url: str
    size: int
    width: int
    height: int


class BlogImagesResponse(BaseModel):
    blog_id: str
    blog_slug: str
    images: List[str]
    total_count: int


class Token(BaseModel):
    access_token: str
    token_type: str


class LoginRequest(BaseModel):
    username: str
    password: str
