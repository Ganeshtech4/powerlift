"""
Committee Members CRUD endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app.db.committee_db import get_committee_table
from app.schemas.committee import CommitteeMemberCreate, CommitteeMemberUpdate, CommitteeMemberResponse
from app.services.committee_service import committee_service
from app.core.security import verify_token

router = APIRouter()


@router.post("/", response_model=CommitteeMemberResponse, status_code=status.HTTP_201_CREATED)
def create_committee_member(
    member: CommitteeMemberCreate,
    table=Depends(get_committee_table),
    current_user: str = Depends(verify_token)
):
    """Create a new committee member (Admin only)"""
    return committee_service.create(table, member)


@router.get("/", response_model=List[CommitteeMemberResponse])
def get_committee_members(table=Depends(get_committee_table)):
    """Get all committee members"""
    return committee_service.get_all(table)


@router.get("/{member_id}", response_model=CommitteeMemberResponse)
def get_committee_member(member_id: str, table=Depends(get_committee_table)):
    """Get committee member by ID"""
    member = committee_service.get_by_id(table, member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Committee member not found")
    return member


@router.put("/{member_id}", response_model=CommitteeMemberResponse)
def update_committee_member(
    member_id: str,
    member_update: CommitteeMemberUpdate,
    table=Depends(get_committee_table),
    current_user: str = Depends(verify_token)
):
    """Update committee member (Admin only)"""
    member = committee_service.update(table, member_id, member_update)
    if not member:
        raise HTTPException(status_code=404, detail="Committee member not found")
    return member


@router.delete("/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_committee_member(
    member_id: str,
    table=Depends(get_committee_table),
    current_user: str = Depends(verify_token)
):
    """Delete committee member (Admin only)"""
    success = committee_service.delete(table, member_id)
    if not success:
        raise HTTPException(status_code=404, detail="Committee member not found")
    return None
