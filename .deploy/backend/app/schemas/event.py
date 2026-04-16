"""
Events/Calendar Pydantic schemas
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum


class EventCategory(str, Enum):
    DISTRICT = "district"
    STATE = "state"
    NATIONALS = "national"
    INTERNATIONALS = "international"


class EventBase(BaseModel):
    title: str
    category: EventCategory
    event_date: str  # ISO format date
    end_date: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    registration_link: Optional[str] = None
    contact_person: Optional[str] = None
    contact_number: Optional[str] = None
    is_active: bool = True
    
    class Config:
        # Allow both 'category' and 'event_type' as field names
        populate_by_name = True


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[EventCategory] = None
    event_date: Optional[str] = None
    end_date: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    registration_link: Optional[str] = None
    contact_person: Optional[str] = None
    contact_number: Optional[str] = None
    is_active: Optional[bool] = None


class EventResponse(EventBase):
    id: str
    created_at: str
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True
        populate_by_name = True
