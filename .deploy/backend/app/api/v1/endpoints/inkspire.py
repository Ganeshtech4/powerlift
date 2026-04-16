"""
Inkspire books CRUD endpoints
"""
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.security import verify_token
from app.db.inkspire_db import get_inkspire_table
from app.schemas.inkspire import InkspireBookCreate, InkspireBookResponse, InkspireBookUpdate
from app.services.inkspire_service import inkspire_service

router = APIRouter()


@router.post("/", response_model=InkspireBookResponse, status_code=status.HTTP_201_CREATED)
def create_inkspire_book(
    book: InkspireBookCreate,
    table=Depends(get_inkspire_table),
    current_user: str = Depends(verify_token)
):
    return inkspire_service.create(table, book)


@router.get("/", response_model=List[InkspireBookResponse])
def get_inkspire_books(table=Depends(get_inkspire_table)):
    return inkspire_service.get_all(table)


@router.get("/{book_id}", response_model=InkspireBookResponse)
def get_inkspire_book(book_id: str, table=Depends(get_inkspire_table)):
    book = inkspire_service.get_by_id(table, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Inkspire book not found")
    return book


@router.put("/{book_id}", response_model=InkspireBookResponse)
def update_inkspire_book(
    book_id: str,
    book_update: InkspireBookUpdate,
    table=Depends(get_inkspire_table),
    current_user: str = Depends(verify_token)
):
    book = inkspire_service.update(table, book_id, book_update)
    if not book:
        raise HTTPException(status_code=404, detail="Inkspire book not found")
    return book


@router.delete("/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_inkspire_book(
    book_id: str,
    table=Depends(get_inkspire_table),
    current_user: str = Depends(verify_token)
):
    success = inkspire_service.delete(table, book_id)
    if not success:
        raise HTTPException(status_code=404, detail="Inkspire book not found")
    return None