"""
Results Pydantic schemas
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum


class ResultCategory(str, Enum):
    DISTRICT = "district"
    STATE = "state"
    NATIONALS = "nationals"
    INTERNATIONALS = "internationals"


class ResultType(str, Enum):
    CHAMPIONSHIP = "championship"
    RECORDS = "records"
    RESULTS = "results"
    ID_CARD = "id_card"   # Used by IDCardsManager
    RESULT = "result"     # Legacy alias


class ResultBase(BaseModel):
    title: str
    category: Optional[str] = "district"  # Allow any custom category
    type: ResultType
    athlete_name: Optional[str] = None
    event_name: Optional[str] = None
    event_date: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    images: Optional[list] = []


class ResultCreate(ResultBase):
    pass


class ResultUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None  # Allow any custom category
    type: Optional[ResultType] = None
    athlete_name: Optional[str] = None
    event_name: Optional[str] = None
    event_date: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    images: Optional[list] = None


class ResultResponse(ResultBase):
    id: str
    created_at: str
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True
