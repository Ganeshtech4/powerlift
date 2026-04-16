"""
Partnerships CRUD endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app.db.partnerships_db import get_partnership_table
from app.schemas.partnership import PartnershipCreate, PartnershipUpdate, PartnershipResponse
from app.services.partnership_service import partnership_service
from app.core.security import verify_token

router = APIRouter()


@router.post("/", response_model=PartnershipResponse, status_code=status.HTTP_201_CREATED)
def create_partnership(
    partnership: PartnershipCreate,
    table=Depends(get_partnership_table),
    current_user: str = Depends(verify_token)
):
    """Create a new partnership (Admin only)"""
    return partnership_service.create(table, partnership)


@router.get("/", response_model=List[PartnershipResponse])
def get_partnerships(table=Depends(get_partnership_table)):
    """Get all partnerships"""
    return partnership_service.get_all(table)


@router.get("/{partnership_id}", response_model=PartnershipResponse)
def get_partnership(partnership_id: str, table=Depends(get_partnership_table)):
    """Get partnership by ID"""
    partnership = partnership_service.get_by_id(table, partnership_id)
    if not partnership:
        raise HTTPException(status_code=404, detail="Partnership not found")
    return partnership


@router.put("/{partnership_id}", response_model=PartnershipResponse)
def update_partnership(
    partnership_id: str,
    partnership_update: PartnershipUpdate,
    table=Depends(get_partnership_table),
    current_user: str = Depends(verify_token)
):
    """Update partnership (Admin only)"""
    partnership = partnership_service.update(table, partnership_id, partnership_update)
    if not partnership:
        raise HTTPException(status_code=404, detail="Partnership not found")
    return partnership


@router.delete("/{partnership_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_partnership(
    partnership_id: str,
    table=Depends(get_partnership_table),
    current_user: str = Depends(verify_token)
):
    """Delete partnership (Admin only)"""
    success = partnership_service.delete(table, partnership_id)
    if not success:
        raise HTTPException(status_code=404, detail="Partnership not found")
    return None
