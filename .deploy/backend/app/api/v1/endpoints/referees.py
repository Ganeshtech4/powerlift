"""
Referees CRUD endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app.db.referees_db import get_referee_table
from app.schemas.referee import RefereeCreate, RefereeUpdate, RefereeResponse
from app.services.referee_service import referee_service
from app.core.security import verify_token

router = APIRouter()


@router.post("/", response_model=RefereeResponse, status_code=status.HTTP_201_CREATED)
def create_referee(
    referee: RefereeCreate,
    table=Depends(get_referee_table),
    current_user: str = Depends(verify_token)
):
    """Create a new referee (Admin only)"""
    return referee_service.create(table, referee)


@router.get("/", response_model=List[RefereeResponse])
def get_referees(table=Depends(get_referee_table)):
    """Get all referees"""
    return referee_service.get_all(table)


@router.get("/{referee_id}", response_model=RefereeResponse)
def get_referee(referee_id: str, table=Depends(get_referee_table)):
    """Get referee by ID"""
    referee = referee_service.get_by_id(table, referee_id)
    if not referee:
        raise HTTPException(status_code=404, detail="Referee not found")
    return referee


@router.put("/{referee_id}", response_model=RefereeResponse)
def update_referee(
    referee_id: str,
    referee_update: RefereeUpdate,
    table=Depends(get_referee_table),
    current_user: str = Depends(verify_token)
):
    """Update referee (Admin only)"""
    referee = referee_service.update(table, referee_id, referee_update)
    if not referee:
        raise HTTPException(status_code=404, detail="Referee not found")
    return referee


@router.delete("/{referee_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_referee(
    referee_id: str,
    table=Depends(get_referee_table),
    current_user: str = Depends(verify_token)
):
    """Delete referee (Admin only)"""
    success = referee_service.delete(table, referee_id)
    if not success:
        raise HTTPException(status_code=404, detail="Referee not found")
    return None
