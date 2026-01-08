"""
Events/Calendar CRUD endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List

from app.db.events_db import get_event_table
from app.schemas.event import EventCreate, EventUpdate, EventResponse
from app.services.event_service import event_service
from app.core.security import verify_token

router = APIRouter()


@router.post("/", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(
    event: EventCreate,
    table = Depends(get_event_table),
    current_user: str = Depends(verify_token)
):
    """Create a new event (Admin only)"""
    new_event = event_service.create_event(table, event)
    return new_event


@router.get("/", response_model=List[EventResponse])
def get_events(
    active_only: bool = Query(False, description="Show only active events"),
    table = Depends(get_event_table)
):
    """Get all events"""
    events = event_service.get_all_events(table, active_only=active_only)
    return events


@router.get("/upcoming", response_model=List[EventResponse])
def get_upcoming_events(
    limit: int = Query(10, description="Number of upcoming events to return"),
    table = Depends(get_event_table)
):
    """Get upcoming events"""
    events = event_service.get_upcoming_events(table, limit=limit)
    return events


@router.get("/{event_id}", response_model=EventResponse)
def get_event(event_id: str, table = Depends(get_event_table)):
    """Get event by ID"""
    event = event_service.get_event_by_id(table, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.put("/{event_id}", response_model=EventResponse)
def update_event(
    event_id: str,
    event_update: EventUpdate,
    table = Depends(get_event_table),
    current_user: str = Depends(verify_token)
):
    """Update event (Admin only)"""
    event = event_service.update_event(table, event_id, event_update)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(
    event_id: str,
    table = Depends(get_event_table),
    current_user: str = Depends(verify_token)
):
    """Delete event (Admin only)"""
    success = event_service.delete_event(table, event_id)
    if not success:
        raise HTTPException(status_code=404, detail="Event not found")
    return None
