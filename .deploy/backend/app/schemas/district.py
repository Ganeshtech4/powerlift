"""
District Pydantic schemas
"""
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class DistrictBase(BaseModel):
    name: str
    is_available: bool = True  # True = looking for president, False = president assigned
    president_name: Optional[str] = None
    president_email: Optional[EmailStr] = None
    president_phone: Optional[str] = None
    president_photo_url: Optional[str] = None
    description: Optional[str] = None


class DistrictCreate(DistrictBase):
    pass


class DistrictUpdate(BaseModel):
    name: Optional[str] = None
    is_available: Optional[bool] = None
    president_name: Optional[str] = None
    president_email: Optional[EmailStr] = None
    president_phone: Optional[str] = None
    president_photo_url: Optional[str] = None
    description: Optional[str] = None


class DistrictResponse(DistrictBase):
    id: str
    created_at: str
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True


class DistrictEnquiry(BaseModel):
    district_id: str
    district_name: str
    name: str
    email: EmailStr
    phone: str
    message: str
