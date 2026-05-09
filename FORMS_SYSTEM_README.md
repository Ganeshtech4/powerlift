# Forms Management System

## Overview

The Forms Management System allows administrators to upload and manage registration forms and ID card forms for different competition levels (state, district, national, international). Users can browse and download these forms from the public registration page.

## Features

- **Admin Features:**
  - Upload PDF forms to S3
  - Categorize forms by level (state/district/national/international)
  - Separate registration forms and ID card forms
  - Edit form titles and descriptions
  - Set display order for forms
  - Delete forms

- **Public Features:**
  - Browse forms by category
  - View registration forms and ID card forms separately
  - Download PDF forms
  - Responsive design

## System Components

### Backend

#### 1. Database Schema (DynamoDB)
- **Table:** `forms`
- **Primary Key:** `id` (String) - UUID
- **Attributes:**
  - `category`: state | district | national | international
  - `form_type`: registration | id_card
  - `title`: Form title
  - `description`: Optional description
  - `file_url`: S3 URL of the PDF
  - `file_name`: Original filename
  - `display_order`: Sort order (integer)
  - `created_at`: Timestamp
  - `updated_at`: Timestamp
- **GSI:** `category-index` on `category` for efficient filtering

#### 2. API Endpoints
**Public Endpoints:**
- `GET /api/v1/forms/` - Get all forms
- `GET /api/v1/forms/category/{category}` - Get forms by category
- `GET /api/v1/forms/{form_id}` - Get single form

**Admin Endpoints (require authentication):**
- `POST /api/v1/forms/` - Create new form
- `PUT /api/v1/forms/{form_id}` - Update form
- `DELETE /api/v1/forms/{form_id}` - Delete form

#### 3. Files
- `blog-backend/app/schemas/forms.py` - Pydantic schemas
- `blog-backend/app/db/forms_db.py` - DynamoDB operations
- `blog-backend/app/api/v1/endpoints/forms.py` - API endpoints
- `blog-backend/scripts/create_forms_table.py` - Migration script

### Frontend

#### Admin Interface
- **Location:** `src/pages/admin/sections/FormsManager.js`
- **Route:** Admin Dashboard → Registration Forms tab
- **Features:**
  - Grid view of all forms
  - Filter by category and form type
  - Upload PDF files (max 10MB)
  - Edit/delete forms
  - Drag-and-drop file upload
  - Preview PDFs in new tab

#### Public Page
- **Location:** `src/pages/registration/RegistrationMain.js`
- **Route:** `/registration`
- **Features:**
  - Category filter buttons
  - Separate sections for registration and ID card forms
  - Download buttons for each form
  - Responsive card layout

## Setup Instructions

### 1. Create DynamoDB Table

```bash
cd blog-backend
python scripts/create_forms_table.py
```

### 2. Configure S3 Bucket

Ensure the S3 bucket `rekhawpc` has:
- A `forms/` folder for storing form PDFs
- Public read access for form files
- CORS configuration for uploads

### 3. Start Backend

```bash
cd blog-backend
python main.py
```

### 4. Start Frontend

```bash
cd ..
npm start
```

## Usage Guide

### Admin: Uploading Forms

1. Log in to admin dashboard
2. Navigate to "Registration Forms" tab
3. Click "+ Add New Form"
4. Fill in form details:
   - Select category (state/district/national/international)
   - Select form type (registration/id_card)
   - Enter title and description
   - Upload PDF file (max 10MB)
   - Set display order (optional)
5. Click "Save Form"

### Admin: Managing Forms

- **Edit:** Click pencil icon on form card
- **Delete:** Click trash icon on form card
- **Filter:** Use category/type dropdowns to filter view
- **Preview:** Click "Preview PDF" to open in new tab

### Public: Downloading Forms

1. Visit `/registration` page
2. Use category filter buttons to narrow down forms
3. Browse "Registration Forms" or "ID Card Forms" sections
4. Click "Download PDF" button on desired form

## File Storage

- **S3 Bucket:** `rekhawpc`
- **Folder:** `forms/`
- **Naming:** PDFs are stored with timestamp prefix: `{timestamp}_{original_filename}`
- **Example:** `1704067200000_state_registration.pdf`

## API Examples

### Get All Forms
```bash
curl http://localhost:8000/api/v1/forms/
```

### Get State Level Forms
```bash
curl http://localhost:8000/api/v1/forms/category/state
```

### Create Form (Admin)
```bash
curl -X POST http://localhost:8000/api/v1/forms/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "state",
    "form_type": "registration",
    "title": "State Level Registration Form",
    "description": "Application for state level competitions",
    "file_url": "https://rekhawpc.s3.ap-south-2.amazonaws.com/forms/form.pdf",
    "file_name": "form.pdf",
    "display_order": 1
  }'
```

## Deployment Notes

- Forms table must be created in production DynamoDB
- S3 bucket permissions must allow public read for forms/
- Backend must have AWS credentials configured
- Frontend build includes forms CSS and components

## Troubleshooting

### Forms not loading
- Check DynamoDB table exists: `forms`
- Verify AWS credentials in backend
- Check backend logs for errors

### Upload failing
- Verify S3 bucket permissions
- Check file size (max 10MB)
- Ensure file is PDF format
- Check network connection

### Forms not appearing on public page
- Verify API endpoint `/api/v1/forms/` is accessible
- Check browser console for errors
- Ensure forms exist in database

## Future Enhancements

- [ ] Bulk upload multiple forms
- [ ] Form analytics (download counts)
- [ ] Form versioning
- [ ] Email notifications on form updates
- [ ] Search/filter by title
- [ ] Form categories customization
- [ ] Multi-language support
