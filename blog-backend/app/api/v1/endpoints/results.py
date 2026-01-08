"""
Results CRUD endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional

from app.db.results_db import get_result_table
from app.schemas.result import ResultCreate, ResultUpdate, ResultResponse
from app.services.result_service import result_service
from app.core.security import verify_token

router = APIRouter()


@router.post("/", response_model=ResultResponse, status_code=status.HTTP_201_CREATED)
def create_result(
    result: ResultCreate,
    table = Depends(get_result_table),
    current_user: str = Depends(verify_token)
):
    """Create a new result (Admin only)"""
    new_result = result_service.create_result(table, result)
    return new_result


@router.get("/", response_model=List[ResultResponse])
def get_results(
    category: Optional[str] = Query(None, description="Filter by category: district, state, nationals"),
    result_type: Optional[str] = Query(None, description="Filter by type: id_card, result_image"),
    table = Depends(get_result_table)
):
    """Get all results with optional filtering"""
    results = result_service.get_all_results(table, category=category, result_type=result_type)
    return results


@router.get("/{result_id}", response_model=ResultResponse)
def get_result(result_id: str, table = Depends(get_result_table)):
    """Get result by ID"""
    result = result_service.get_result_by_id(table, result_id)
    if not result:
        raise HTTPException(status_code=404, detail="Result not found")
    return result


@router.put("/{result_id}", response_model=ResultResponse)
def update_result(
    result_id: str,
    result_update: ResultUpdate,
    table = Depends(get_result_table),
    current_user: str = Depends(verify_token)
):
    """Update result (Admin only)"""
    result = result_service.update_result(table, result_id, result_update)
    if not result:
        raise HTTPException(status_code=404, detail="Result not found")
    return result


@router.delete("/{result_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_result(
    result_id: str,
    table = Depends(get_result_table),
    current_user: str = Depends(verify_token)
):
    """Delete result (Admin only)"""
    success = result_service.delete_result(table, result_id)
    if not success:
        raise HTTPException(status_code=404, detail="Result not found")
    return None
