"""
Forms API endpoints
"""
from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from app.schemas.forms import FormCreate, FormUpdate, FormResponse
from app.db import forms_db
from app.core.security import verify_token
from app.db.dynamodb import get_dynamodb_client

router = APIRouter()


def get_forms_table():
    """Dependency to get forms table"""
    dynamodb = get_dynamodb_client()
    # Get table reference (table is created via migration script)
    return dynamodb.Table('forms')


@router.get("/", response_model=List[FormResponse])
def get_all_forms(table=Depends(get_forms_table)):
    """Get all forms (Public)"""
    forms = forms_db.get_all_forms(table)
    return forms


@router.get("/category/{category}", response_model=List[FormResponse])
def get_forms_by_category(
    category: str,
    table=Depends(get_forms_table)
):
    """Get forms by category (Public)"""
    if category not in ["state", "district", "national", "international"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid category. Must be: state, district, national, or international"
        )
    forms = forms_db.get_forms_by_category(table, category)
    return forms


@router.get("/{form_id}", response_model=FormResponse)
def get_form(form_id: str, table=Depends(get_forms_table)):
    """Get form by ID (Public)"""
    form = forms_db.get_form_by_id(table, form_id)
    if not form:
        raise HTTPException(status_code=404, detail="Form not found")
    return form


@router.post("/", response_model=FormResponse, status_code=status.HTTP_201_CREATED)
def create_form(
    form: FormCreate,
    table=Depends(get_forms_table),
    current_user: str = Depends(verify_token)
):
    """Create form (Admin only)"""
    form_data = form.dict()
    new_form = forms_db.create_form(table, form_data)
    return new_form


@router.put("/{form_id}", response_model=FormResponse)
def update_form(
    form_id: str,
    form_update: FormUpdate,
    table=Depends(get_forms_table),
    current_user: str = Depends(verify_token)
):
    """Update form (Admin only)"""
    form_data = form_update.dict(exclude_unset=True)
    updated_form = forms_db.update_form(table, form_id, form_data)
    if not updated_form:
        raise HTTPException(status_code=404, detail="Form not found")
    return updated_form


@router.delete("/{form_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_form(
    form_id: str,
    table=Depends(get_forms_table),
    current_user: str = Depends(verify_token)
):
    """Delete form (Admin only)"""
    success = forms_db.delete_form(table, form_id)
    if not success:
        raise HTTPException(status_code=404, detail="Form not found")
    return None
