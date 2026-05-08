"""
VTD books CRUD endpoints
"""
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.security import verify_token
from app.db.vtd_db import get_vtd_table
from app.schemas.vtd import VtdBookCreate, VtdBookResponse, VtdBookUpdate
from app.services.vtd_service import vtd_service

router = APIRouter()


@router.post("/", response_model=VtdBookResponse, status_code=status.HTTP_201_CREATED)
def create_vtd_book(
    book: VtdBookCreate,
    table=Depends(get_vtd_table),
    current_user: str = Depends(verify_token)
):
    return vtd_service.create(table, book)


@router.get("/", response_model=List[VtdBookResponse])
def get_vtd_books(table=Depends(get_vtd_table)):
    return vtd_service.get_all(table)


@router.get("/{book_id}", response_model=VtdBookResponse)
def get_vtd_book(book_id: str, table=Depends(get_vtd_table)):
    book = vtd_service.get_by_id(table, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="VTD book not found")
    return book


@router.put("/{book_id}", response_model=VtdBookResponse)
def update_vtd_book(
    book_id: str,
    book_update: VtdBookUpdate,
    table=Depends(get_vtd_table),
    current_user: str = Depends(verify_token)
):
    book = vtd_service.update(table, book_id, book_update)
    if not book:
        raise HTTPException(status_code=404, detail="VTD book not found")
    return book


@router.delete("/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vtd_book(
    book_id: str,
    table=Depends(get_vtd_table),
    current_user: str = Depends(verify_token)
):
    success = vtd_service.delete(table, book_id)
    if not success:
        raise HTTPException(status_code=404, detail="VTD book not found")
    return None
