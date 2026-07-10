"""
VTD CRUD endpoints (Gallery-style)
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List

from app.db.vtd_db import get_vtd_table
from app.schemas.vtd import VtdCreate, VtdUpdate, VtdResponse, VtdListResponse
from app.services.vtd_service import vtd_service
from app.core.security import verify_token

router = APIRouter()


@router.post("/", response_model=VtdResponse, status_code=status.HTTP_201_CREATED)
def create_vtd(
    vtd: VtdCreate,
    table = Depends(get_vtd_table),
    current_user: str = Depends(verify_token)
):
    """Create a new VTD item (Admin only)"""
    new_vtd = vtd_service.create(table, vtd)
    return new_vtd


@router.get("/", response_model=List[VtdListResponse])
def get_vtd_items(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    published_only: bool = Query(False),
    table = Depends(get_vtd_table)
):
    """Get all VTD items with pagination"""
    items = vtd_service.get_all(table, skip, limit, published_only)
    return items


@router.get("/{vtd_id}", response_model=VtdResponse)
def get_vtd(vtd_id: str, table = Depends(get_vtd_table)):
    """Get VTD item by ID"""
    try:
        vtd = vtd_service.get_by_id(table, vtd_id)
        if not vtd:
            raise HTTPException(status_code=404, detail="VTD item not found")
        
        # Increment view count
        try:
            vtd_service.increment_views(table, vtd_id)
        except Exception as e:
            print(f"Warning: Could not increment views: {e}")
        
        return vtd
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in get_vtd: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/slug/{slug}", response_model=VtdResponse)
def get_vtd_by_slug(slug: str, table = Depends(get_vtd_table)):
    """Get VTD item by slug"""
    vtd = vtd_service.get_by_slug(table, slug)
    if not vtd:
        raise HTTPException(status_code=404, detail="VTD item not found")
    
    # Increment view count
    vtd_service.increment_views(table, vtd["id"])
    return vtd


@router.put("/{vtd_id}", response_model=VtdResponse)
def update_vtd(
    vtd_id: str,
    vtd_update: VtdUpdate,
    table = Depends(get_vtd_table),
    current_user: str = Depends(verify_token)
):
    """Update VTD item (Admin only)"""
    updated_vtd = vtd_service.update(table, vtd_id, vtd_update)
    if not updated_vtd:
        raise HTTPException(status_code=404, detail="VTD item not found")
    return updated_vtd


@router.delete("/{vtd_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vtd(
    vtd_id: str,
    table = Depends(get_vtd_table),
    current_user: str = Depends(verify_token)
):
    """Delete VTD item (Admin only)"""
    success = vtd_service.delete(table, vtd_id)
    if not success:
        raise HTTPException(status_code=404, detail="VTD item not found")
    return None
