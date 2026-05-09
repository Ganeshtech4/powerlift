"""
Forms Pydantic schemas
"""
from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime


class FormBase(BaseModel):
    category: Literal["state", "district", "national", "international"]
    form_type: Literal["registration", "id_card"]
    title: str
    description: Optional[str] = None
    file_url: str  # S3 URL
    file_name: str
    display_order: int = 999


class FormCreate(FormBase):
    pass


class FormUpdate(BaseModel):
    category: Optional[Literal["state", "district", "national", "international"]] = None
    form_type: Optional[Literal["registration", "id_card"]] = None
    title: Optional[str] = None
    description: Optional[str] = None
    file_url: Optional[str] = None
    file_name: Optional[str] = None
    display_order: Optional[int] = None


class FormResponse(FormBase):
    id: str
    created_at: str
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True
