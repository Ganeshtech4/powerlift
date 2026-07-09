# WPC Telangana - Architecture & Data Flow Diagrams

**Visual Reference for Technical Team**

---

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           END USERS / VISITORS                          │
│                     (Desktop, Tablet, Mobile Browsers)                  │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 │ HTTPS
                                 │
                ┌────────────────▼──────────────────┐
                │         NGINX Web Server          │
                │      (Reverse Proxy + SSL)        │
                │         Port 80/443               │
                └────────────┬──────────┬───────────┘
                             │          │
                    /        │          │      /api/v1/*
                   static    │          │      requests
                   files     │          │
                             │          │
                ┌────────────▼──┐   ┌──▼─────────────────┐
                │   FRONTEND    │   │     BACKEND        │
                │               │   │                    │
                │  React SPA    │   │  FastAPI (Python)  │
                │  Port 3000    │   │  Port 8000         │
                │               │   │                    │
                │ ┌───────────┐ │   │ ┌────────────────┐ │
                │ │Components │ │   │ │   API Routes   │ │
                │ │  - Header │ │   │ │   /auth        │ │
                │ │  - News   │ │   │ │   /blog        │ │
                │ │  - Gallery│ │   │ │   /news        │ │
                │ │  - Admin  │ │   │ │   /committee   │ │
                │ └───────────┘ │   │ │   /s3          │ │
                │               │   │ └────────────────┘ │
                │ ┌───────────┐ │   │                    │
                │ │ Axios API │ │   │ ┌────────────────┐ │
                │ │  Client   │◄─────┼─┤   Services     │ │
                │ └───────────┘ │   │ │   Layer        │ │
                │               │   │ └────────────────┘ │
                └───────────────┘   └──────┬─────────────┘
                                           │
                                           │ AWS SDK
                                           │ (Boto3)
                                           │
                      ┌────────────────────┴────────────────────┐
                      │                                         │
                      │                                         │
                 ┌────▼──────────┐                    ┌────────▼──────┐
                 │  AWS DynamoDB │                    │    AWS S3     │
                 │   (Database)  │                    │   (Storage)   │
                 │               │                    │               │
                 │ ┌───────────┐ │                    │ ┌───────────┐ │
                 │ │rekha_news │ │                    │ │   /news   │ │
                 │ │rekha_blogs│ │                    │ │   /blog   │ │
                 │ │rekha_...  │ │                    │ │   /gallery│ │
                 │ │(10 tables)│ │                    │ │   /vtd    │ │
                 │ └───────────┘ │                    │ └───────────┘ │
                 │               │                    │               │
                 │ Pay-Per-Request│                    │ Public Read  │
                 └───────────────┘                    └──────────────┘
```

---

## 2. Request Flow - Public User Journey

### Scenario: User Visits News Page

```
┌──────────┐
│  BROWSER │
│  User    │
└────┬─────┘
     │
     │ 1. Navigate to /news
     │
     ▼
┌─────────────────┐
│  React Router   │
│  Loads NewsPage │
└────┬────────────┘
     │
     │ 2. useEffect() triggered
     │
     ▼
┌──────────────────────────┐
│  Axios HTTP Client       │
│  GET /api/v1/news/       │
│  ?published_only=true    │
└────┬─────────────────────┘
     │
     │ 3. HTTP Request
     │
     ▼
┌─────────────────────────────┐
│  FastAPI Backend            │
│  /api/v1/endpoints/news.py  │
└────┬────────────────────────┘
     │
     │ 4. Route handler calls service
     │
     ▼
┌──────────────────────────┐
│  NewsService             │
│  get_all_news()          │
└────┬─────────────────────┘
     │
     │ 5. DynamoDB query
     │
     ▼
┌──────────────────────────┐
│  AWS DynamoDB            │
│  rekha_news table        │
│  SCAN operation          │
└────┬─────────────────────┘
     │
     │ 6. Return items
     │
     ▼
┌──────────────────────────┐
│  NewsService             │
│  - Filter published      │
│  - Sort by date          │
│  - Separate featured     │
└────┬─────────────────────┘
     │
     │ 7. JSON response
     │
     ▼
┌──────────────────────────┐
│  React Component         │
│  NewsMain.js             │
│  - setNews(data)         │
│  - Render grid           │
│  - Load S3 images        │
└──────────────────────────┘
```

---

## 3. Request Flow - Admin CRUD Operation

### Scenario: Admin Creates News Item with Image

```
┌──────────────┐
│ ADMIN USER   │
│ at /admin    │
└──────┬───────┘
       │
       │ 1. Login with credentials
       │
       ▼
┌──────────────────────┐
│  POST /auth/login    │
│  {user, pass}        │
└──────┬───────────────┘
       │
       │ 2. Verify credentials
       │
       ▼
┌──────────────────────┐
│  JWT Token Generated │
│  30-day expiry       │
└──────┬───────────────┘
       │
       │ 3. Store in localStorage
       │    - adminToken
       │    - isAdminLoggedIn
       │
       ▼
┌──────────────────────────┐
│  Navigate to             │
│  /admin/dashboard        │
│  ?section=news           │
└──────┬───────────────────┘
       │
       │ 4. NewsManager component loads
       │
       ▼
┌──────────────────────────┐
│  User clicks "Add News"  │
│  Opens modal form        │
└──────┬───────────────────┘
       │
       │ 5. Selects image file
       │
       ▼
┌────────────────────────────────┐
│  File Upload Handler           │
│  - Create FormData             │
│  - Append file + folder="news" │
└──────┬─────────────────────────┘
       │
       │ 6. POST /api/v1/s3/upload
       │    (with JWT in header)
       │
       ▼
┌──────────────────────────┐
│  Backend S3 Endpoint     │
│  - Verify JWT token      │
│  - Generate filename     │
│  - Upload to S3          │
└──────┬───────────────────┘
       │
       │ 7. S3 Upload
       │
       ▼
┌──────────────────────────┐
│  AWS S3 Bucket           │
│  /news/20260701_...jpg   │
│  ACL: public-read        │
└──────┬───────────────────┘
       │
       │ 8. Return public URL
       │    https://bucket.s3.../news/...jpg
       │
       ▼
┌──────────────────────────┐
│  Form updates            │
│  image_url field         │
└──────┬───────────────────┘
       │
       │ 9. User fills title, category, etc.
       │    Clicks "Add News"
       │
       ▼
┌──────────────────────────┐
│  POST /api/v1/news/      │
│  {title, image_url, ...} │
│  (with JWT in header)    │
└──────┬───────────────────┘
       │
       │ 10. Verify JWT
       │
       ▼
┌──────────────────────────┐
│  NewsService             │
│  create_news()           │
│  - Generate ID (UUID)    │
│  - Generate slug         │
│  - Add timestamps        │
└──────┬───────────────────┘
       │
       │ 11. DynamoDB put_item
       │
       ▼
┌──────────────────────────┐
│  AWS DynamoDB            │
│  rekha_news table        │
│  New item created        │
└──────┬───────────────────┘
       │
       │ 12. Success response
       │
       ▼
┌──────────────────────────┐
│  NewsManager             │
│  - Close modal           │
│  - Refresh table         │
│  - Show new item         │
└──────────────────────────┘
```

---

## 4. Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION SYSTEM                     │
└─────────────────────────────────────────────────────────────┘

LOGIN FLOW:
───────────

  Browser                  Backend                   Storage
  ───────                  ───────                   ───────
     │                        │                         │
     │ POST /auth/login       │                         │
     │ {username, password}   │                         │
     ├───────────────────────>│                         │
     │                        │                         │
     │                        │ Verify against          │
     │                        │ config.ADMIN_USERNAME   │
     │                        │ config.ADMIN_PASSWORD   │
     │                        │                         │
     │                        │ Generate JWT            │
     │                        │ - SECRET_KEY            │
     │                        │ - 30 day expiry         │
     │                        │                         │
     │   {access_token: ...}  │                         │
     │<───────────────────────┤                         │
     │                        │                         │
     │ localStorage.setItem   │                         │
     │ ('adminToken', token)  │                         │
     ├────────────────────────┼────────────────────────>│
     │                        │                         │
     

PROTECTED REQUEST FLOW:
───────────────────────

  Browser                  Backend                  Database
  ───────                  ───────                  ────────
     │                        │                         │
     │ GET /news/             │                         │
     │ Header:                │                         │
     │ Authorization:         │                         │
     │  Bearer <token>        │                         │
     ├───────────────────────>│                         │
     │                        │                         │
     │                        │ Axios interceptor       │
     │                        │ (auto-added token)      │
     │                        │                         │
     │                        │ verify_token()          │
     │                        │ dependency              │
     │                        │ - Decode JWT            │
     │                        │ - Verify signature      │
     │                        │ - Check expiry          │
     │                        │                         │
     │                        │ [Valid ✓]               │
     │                        │                         │
     │                        │ Proceed to handler      │
     │                        │                         │
     │                        │ DynamoDB query          │
     │                        ├────────────────────────>│
     │                        │                         │
     │                        │      Items []           │
     │                        │<────────────────────────┤
     │                        │                         │
     │     JSON response      │                         │
     │<───────────────────────┤                         │
     │                        │                         │


TOKEN EXPIRY FLOW:
──────────────────

  Browser                  Backend
  ───────                  ───────
     │                        │
     │ API request            │
     │ with expired token     │
     ├───────────────────────>│
     │                        │
     │                        │ verify_token()
     │                        │ → Token expired!
     │                        │
     │   401 Unauthorized     │
     │<───────────────────────┤
     │                        │
     │ Axios interceptor      │
     │ detects 401            │
     │                        │
     │ Clear localStorage:    │
     │ - adminToken           │
     │ - isAdminLoggedIn      │
     │                        │
     │ Redirect to            │
     │ /admin/login           │
     │                        │
```

---

## 5. Database Schema Relationships

```
┌────────────────────────────────────────────────────────────────┐
│                      DYNAMODB TABLES                           │
│                    (NoSQL - No Relations)                      │
└────────────────────────────────────────────────────────────────┘

Each table is independent. Relationships are handled in application code.

┌─────────────────────┐
│   rekha_news        │  ← NEW TABLE
├─────────────────────┤
│ id (PK)      String │  UUID
│ slug         String │  URL-friendly
│ title        String │
│ description  String │
│ image_url    String │  → S3 URL
│ thumbnail_url String│  → S3 URL
│ category     String │  Newspaper/Championship/etc
│ published_date String│ ISO 8601
│ is_featured  Boolean│
│ status       String │  published/draft
│ created_at   String │
│ updated_at   String │
└─────────────────────┘

┌─────────────────────┐
│   rekha_blogs       │
├─────────────────────┤
│ id (PK)      String │
│ title        String │
│ slug         String │
│ description  String │  HTML content
│ image        String │  → S3 URL
│ date         String │
│ author       String │
│ tags         List   │  [tag1, tag2]
│ created_at   String │
└─────────────────────┘

┌─────────────────────┐
│ rekha_committee_    │
│    members          │
├─────────────────────┤
│ id (PK)      String │
│ name         String │
│ designation  String │
│ bio          String │
│ image_url    String │  → S3 URL
│ email        String │
│ phone        String │
│ social_media Map    │  {fb, ig, linkedin}
│ order        Number │
│ created_at   String │
└─────────────────────┘

┌─────────────────────┐
│  rekha_referees     │
├─────────────────────┤
│ id (PK)      String │
│ name         String │
│ category     String │  IWF/National/State
│ level        String │
│ image_url    String │  → S3 URL
│ phone        String │
│ email        String │
│ district     String │  → Logical link
│ certificate_url String│ → S3 PDF
│ status       String │
│ created_at   String │
└─────────────────────┘

┌─────────────────────┐
│  rekha_results      │
├─────────────────────┤
│ id (PK)      String │
│ title        String │
│ event_date   String │
│ location     String │
│ category     String │
│ result_pdf_url String│ → S3 PDF
│ image_url    String │  → S3 URL
│ description  String │
│ created_at   String │
└─────────────────────┘

┌─────────────────────┐
│ rekha_partnerships  │
├─────────────────────┤
│ id (PK)      String │
│ title        String │
│ description  String │
│ partner_name String │
│ logo_url     String │  → S3 URL
│ type         String │
│ status       String │
│ start_date   String │
│ end_date     String │
│ contact_person String│
│ created_at   String │
└─────────────────────┘

┌─────────────────────┐
│  rekha_vtd_books    │
│  rekha_inkspire_    │
│     books           │
├─────────────────────┤
│ id (PK)      String │
│ title        String │
│ description  String │
│ pdf_url      String │  → S3 PDF
│ thumbnail_url String│  → S3 URL
│ order        Number │
│ created_at   String │
└─────────────────────┘

┌─────────────────────┐
│  rekha_enquiries    │
│  rekha_forms        │
├─────────────────────┤
│ id (PK)      String │
│ name         String │
│ email        String │
│ phone        String │
│ message/     String │
│  form_data   Map    │
│ status       String │
│ created_at   String │
└─────────────────────┘
```

---

## 6. S3 Storage Structure

```
┌──────────────────────────────────────────────────────────┐
│              AWS S3 Bucket Structure                     │
│          Bucket: wpc-telangana-assets                    │
└──────────────────────────────────────────────────────────┘

s3://wpc-telangana-assets/
│
├── blog/
│   ├── 20260615_123456_image1.jpg
│   ├── 20260620_094521_image2.png
│   └── ...
│
├── news/                          ← NEW FOLDER
│   ├── 20260701_103045_newspaper1.jpg
│   ├── 20260701_114522_championship.jpg
│   └── ...
│
├── committee/
│   ├── 20260510_president.jpg
│   ├── 20260510_secretary.jpg
│   └── ...
│
├── referees/
│   ├── photos/
│   │   ├── 20260505_referee1.jpg
│   │   └── ...
│   └── certificates/
│       ├── 20260505_cert1.pdf
│       └── ...
│
├── results/
│   ├── pdfs/
│   │   ├── 20260401_state_championship.pdf
│   │   └── ...
│   └── photos/
│       ├── 20260401_event_photo.jpg
│       └── ...
│
├── partnerships/
│   ├── 20260301_partner_logo1.png
│   ├── 20260315_partner_logo2.svg
│   └── ...
│
├── vtd/
│   ├── 20260201_vtd_book1.pdf
│   ├── 20260201_vtd_thumbnail1.jpg
│   └── ...
│
├── inkspire/
│   ├── 20260220_inkspire_book1.pdf
│   ├── 20260220_inkspire_thumbnail1.jpg
│   └── ...
│
└── gallery/
    ├── 20260101_gallery_image1.jpg
    ├── 20260115_gallery_image2.jpg
    └── ...


FILE NAMING CONVENTION:
───────────────────────
Format: {folder}/{YYYYMMDD}_{HHMMSS}_{original_filename}

Example:
  news/20260701_103045_telangana_lifters_win.jpg
  
  ├─ Folder: news
  ├─ Date: 2026-07-01
  ├─ Time: 10:30:45
  └─ Original: telangana_lifters_win.jpg


ACCESS PATTERN:
───────────────
Public URL:
https://wpc-telangana-assets.s3.ap-south-1.amazonaws.com/{path}

Example:
https://wpc-telangana-assets.s3.ap-south-1.amazonaws.com/news/20260701_103045_telangana_lifters_win.jpg
```

---

## 7. Admin Dashboard Navigation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Admin Dashboard                          │
│              /admin/dashboard?section={name}                │
└─────────────────────────────────────────────────────────────┘

           ┌──────────────────────────────┐
           │    AdminDashboard.js         │
           │  ┌────────────────────────┐  │
           │  │  URLSearchParams       │  │
           │  │  reads ?section=       │  │
           │  └───────────┬────────────┘  │
           │              │                │
           │  ┌───────────▼────────────┐  │
           │  │   MENU_ITEMS Array     │  │
           │  │  [                     │  │
           │  │   {id:'overview',...}  │  │
           │  │   {id:'blog',...}      │  │
           │  │   {id:'news',...} ←NEW │  │
           │  │   {id:'committee',...} │  │
           │  │   ...                  │  │
           │  │  ]                     │  │
           │  └───────────┬────────────┘  │
           │              │                │
           │  ┌───────────▼────────────┐  │
           │  │  renderContent()       │  │
           │  │  switch(section) {     │  │
           │  │    case 'news':        │  │
           │  │      return            │  │
           │  │       <NewsManager />  │  │
           │  │  }                     │  │
           │  └───────────┬────────────┘  │
           └──────────────┼────────────────┘
                          │
           ┌──────────────▼─────────────────┐
           │       NewsManager.js           │
           │  ┌──────────────────────────┐  │
           │  │  Stats Grid              │  │
           │  │  Total | Published | ... │  │
           │  └──────────────────────────┘  │
           │  ┌──────────────────────────┐  │
           │  │  Filters & Search        │  │
           │  │  Status | Search box     │  │
           │  └──────────────────────────┘  │
           │  ┌──────────────────────────┐  │
           │  │  Data Table              │  │
           │  │  [Edit][Delete][Publish] │  │
           │  └──────────────────────────┘  │
           │  ┌──────────────────────────┐  │
           │  │  Modal Form (if open)    │  │
           │  │  - Image upload          │  │
           │  │  - Title, category, etc  │  │
           │  └──────────────────────────┘  │
           └────────────────────────────────┘


SECTION ROUTING:
────────────────

URL                               Component Rendered
───────────────────────────────   ──────────────────
/admin/dashboard                  → OverviewSection
/admin/dashboard?section=blog     → BlogManager
/admin/dashboard?section=news     → NewsManager ←NEW
/admin/dashboard?section=committee→ TeamManager
/admin/dashboard?section=referees → RefereesManager
/admin/dashboard?section=results  → ResultsManager
/admin/dashboard?section=partnerships → PartnershipsManager
/admin/dashboard?section=vtd      → VtdBooksManager
/admin/dashboard?section=inkspire → InkspireBooksManager
/admin/dashboard?section=forms    → FormsManager
```

---

## 8. Error Handling & Validation Flow

```
┌──────────────────────────────────────────────────────────┐
│              ERROR HANDLING HIERARCHY                    │
└──────────────────────────────────────────────────────────┘

FRONTEND (React):
─────────────────

User Action
    │
    ▼
┌────────────────────┐
│ Form Validation    │  ← Basic checks
│ - Required fields  │
│ - Email format     │
│ - File size        │
└────────┬───────────┘
         │ [Pass]
         ▼
┌────────────────────┐
│ API Call           │
│ try {              │
│   await axios...   │
│ } catch (err) {    │
│   // Handle        │
│ }                  │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Axios Interceptor  │  ← Response interceptor
│ - Detect 401       │
│ - Clear tokens     │
│ - Redirect login   │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Component State    │
│ - Show error msg   │
│ - Reset form       │
│ - User feedback    │
└────────────────────┘


BACKEND (FastAPI):
──────────────────

Request Received
    │
    ▼
┌────────────────────┐
│ CORS Middleware    │  ← Origin check
└────────┬───────────┘
         ▼
┌────────────────────┐
│ Route Handler      │
│ @router.post("/")  │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Pydantic           │  ← Schema validation
│ Validation         │    - Type checking
│ (Schema model)     │    - Required fields
└────────┬───────────┘
         │ [Validation Error]
         │ → 422 Unprocessable Entity
         │
         │ [Pass]
         ▼
┌────────────────────┐
│ Auth Dependency    │  ← JWT verification
│ verify_token()     │
└────────┬───────────┘
         │ [Invalid Token]
         │ → 401 Unauthorized
         │
         │ [Valid]
         ▼
┌────────────────────┐
│ Service Layer      │  ← Business logic
│ - DynamoDB ops     │
│ - S3 operations    │
└────────┬───────────┘
         │ [Exception]
         │ → try/except
         │ → 500 Internal Error
         │
         │ [Success]
         ▼
┌────────────────────┐
│ JSON Response      │
│ 200 OK             │
│ {data: ...}        │
└────────────────────┘
```

---

## 9. Deployment Workflow

```
┌──────────────────────────────────────────────────────────┐
│                 DEPLOYMENT PROCESS                       │
└──────────────────────────────────────────────────────────┘

DEVELOPMENT → STAGING → PRODUCTION


STEP 1: CODE PREPARATION
─────────────────────────

┌──────────────┐
│  Git Repo    │
│  (Local)     │
└──────┬───────┘
       │
       │ git add .
       │ git commit -m "..."
       │ git push origin main
       ▼
┌──────────────┐
│  Remote Repo │
│  (GitHub)    │
└──────────────┘


STEP 2: BACKEND DEPLOYMENT
───────────────────────────

Server (SSH)
    │
    ├─ Pull latest code
    │  git pull origin main
    │
    ├─ Activate venv
    │  source blog-backend/.venv/bin/activate
    │
    ├─ Install dependencies
    │  pip install -r requirements.txt
    │
    ├─ Update .env (if needed)
    │
    └─ Restart PM2
       pm2 restart wpc-backend
       
       ┌─────────────┐
       │ Uvicorn     │
       │ (ASGI)      │
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │ Port 8000   │
       │ Backend API │
       └─────────────┘


STEP 3: FRONTEND DEPLOYMENT
────────────────────────────

Local Machine
    │
    ├─ Update .env.production
    │  REACT_APP_API_URL=https://domain.com/api/v1
    │
    ├─ Build production
    │  npm run build
    │
    │  ┌─────────────┐
    │  │ /build/     │  ← Optimized static files
    │  │ - index.html│
    │  │ - static/   │
    │  │   - js/     │
    │  │   - css/    │
    │  │   - media/  │
    │  └─────────────┘
    │
    └─ Upload to server
       scp -r build/* user@server:/var/www/html/
       
       ┌─────────────┐
       │ Nginx       │
       │ Serves      │
       │ /build/     │
       └─────────────┘


STEP 4: VERIFICATION
────────────────────

┌──────────────┐
│ Health Check │
└──────┬───────┘
       │
       ├─ Backend: https://domain.com/api/v1/docs
       │            (FastAPI auto-docs)
       │
       ├─ Frontend: https://domain.com/
       │             (Homepage loads)
       │
       ├─ Admin: https://domain.com/admin
       │          (Login works)
       │
       └─ API: Test CRUD operations
               (Create, read, update, delete)


ROLLBACK PROCEDURE (if issues):
────────────────────────────────

Backend:
  pm2 logs wpc-backend  # Check errors
  git checkout previous-commit
  pm2 restart wpc-backend

Frontend:
  Restore previous /build/ backup
  Or: git checkout previous-commit
      npm run build
      Upload again
```

---

## Document End

**For Questions or Clarifications:**
- Review `ARCHITECTURE.md` for detailed explanations
- Check FastAPI auto-docs at `/docs` endpoint
- Review component source code in `/src/` directories
- Contact development team

**Quick Reference URLs:**
- Frontend Dev: http://localhost:3000
- Backend Dev: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Admin Panel: http://localhost:3000/admin
