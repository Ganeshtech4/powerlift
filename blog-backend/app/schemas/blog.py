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
    images: Optional[List[str]] = []
    thumbnail_url: Optional[str] = None
    author: Optional[str] = "Admin"
    location: Optional[str] = None
    event_date: Optional[str] = None


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=255)
    content: Optional[str] = Field(None, min_length=10)
    excerpt: Optional[str] = Field(None, max_length=500)
    category: Optional[GalleryCategory] = None
    tags: Optional[str] = None
    is_published: Optional[bool] = None
    images: Optional[List[str]] = None
    thumbnail_url: Optional[str] = None
    author: Optional[str] = None
    location: Optional[str] = None
    event_date: Optional[str] = None


class BlogResponse(BaseModel):
    id: str
    title: str
    slug: str
    content: str
    excerpt: Optional[str] = None
    category: Optional[str] = None  # Allow any string, not just enum
    tags: Optional[str] = None
    is_published: bool
    s3_folder_path: str
    thumbnail_url: Optional[str] = None
    image_count: int
    images: Optional[List[str]] = []
    author: str
    views: int
    location: Optional[str] = None
    event_date: Optional[str] = None
    created_at: str  # ISO format string from DynamoDB
    updated_at: Optional[str] = None  # ISO format string
    published_at: Optional[str] = None  # ISO format string

    class Config:
        from_attributes = True


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
    images: Optional[List[str]] = []
    created_at: str  # ISO format string
    published_at: Optional[str] = None  # ISO format string


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
