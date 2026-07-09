# WPC Telangana - Quick Start Guide for New Tech Team

**Fast-track onboarding document**

---

## 🚀 Quick Setup (5 Minutes)

### Prerequisites
```bash
✓ Node.js 16+ installed
✓ Python 3.9+ installed
✓ AWS account credentials ready
✓ Git installed
```

### 1. Clone & Install

```bash
# Clone repository
git clone <repository-url>
cd Powerlift

# Backend setup
cd blog-backend
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # Linux/Mac
pip install -r requirements.txt

# Frontend setup (in new terminal)
cd ..
npm install
```

### 2. Configure Environment

**Backend `.env` (create in `blog-backend/` folder):**
```bash
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_secret_here
S3_BUCKET_NAME=wpc-telangana-assets

ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme123

SECRET_KEY=your-jwt-secret-min-32-chars-random-string
```

**Frontend `.env` (create in root folder):**
```bash
REACT_APP_API_URL=http://localhost:8000/api/v1
```

### 3. Start Development

```bash
# Terminal 1: Backend
cd blog-backend
.venv\Scripts\activate
uvicorn main:app --reload --port 8000

# Terminal 2: Frontend
npm start
```

**Access:**
- Frontend: http://localhost:3000
- Backend API Docs: http://localhost:8000/docs
- Admin Panel: http://localhost:3000/admin (user: admin, pass: changeme123)

---

## 📊 Tech Stack at a Glance

| Layer | Technology | Port |
|-------|-----------|------|
| **Frontend** | React 18 + React Router | 3000 |
| **Backend** | FastAPI (Python) | 8000 |
| **Database** | AWS DynamoDB (10 tables) | - |
| **Storage** | AWS S3 (public bucket) | - |
| **Auth** | JWT tokens (30 days) | - |

---

## 🗂️ Project Structure (Key Folders)

```
Powerlift/
├── src/                          # FRONTEND
│   ├── pages/                    # Page components
│   │   ├── news/                 # News page (NEW)
│   │   ├── admin/                # Admin dashboard
│   │   └── ...                   # Other pages
│   ├── components/               # Reusable components
│   │   ├── Layout/Header/        # Navbar
│   │   └── Common/               # Shared components
│   ├── config/
│   │   └── axiosConfig.js        # ⭐ API client setup
│   └── assets/css/
│       └── eventflow.css         # Main stylesheet
│
├── blog-backend/                 # BACKEND
│   ├── main.py                   # ⭐ App entry point
│   ├── app/
│   │   ├── api/v1/endpoints/     # API routes
│   │   │   ├── news.py           # News CRUD (NEW)
│   │   │   ├── blog.py
│   │   │   └── ...
│   │   ├── services/             # Business logic
│   │   │   └── news_service.py   # News operations (NEW)
│   │   ├── schemas/              # Request/response models
│   │   │   └── news.py           # News schema (NEW)
│   │   ├── db/                   # DynamoDB connections
│   │   │   └── news_db.py        # News table (NEW)
│   │   └── core/
│   │       ├── config.py         # ⭐ Environment settings
│   │       └── security.py       # JWT auth
│   └── requirements.txt
│
└── public/images/                # Public static assets
```

---

## 🔑 Key Concepts

### 1. How Data Flows

```
User clicks on "News" 
  → React loads /news page
  → Fetches GET /api/v1/news/?published_only=true
  → Backend queries DynamoDB rekha_news table
  → Returns JSON with image URLs (from S3)
  → React displays news grid with images
```

### 2. Admin Dashboard Pattern

**URL:** `/admin/dashboard?section=news`

The admin dashboard uses URL parameters to switch sections. All managed in one component:

```javascript
// src/pages/admin/AdminDashboard.js
const section = new URLSearchParams(location.search).get('section');

switch(section) {
  case 'news': return <NewsManager />;
  case 'blog': return <BlogManager />;
  // ...
}
```

### 3. Database Tables (DynamoDB)

All tables start with `rekha_` prefix:

| Table Name | Purpose | Key Fields |
|------------|---------|------------|
| `rekha_news` | News & media (NEW) | id, title, image_url, status |
| `rekha_blogs` | Blog posts | id, title, description, image |
| `rekha_committee_members` | Team | id, name, designation, image_url |
| `rekha_referees` | Referees | id, name, category, certificate_url |
| `rekha_results` | Competition results | id, title, result_pdf_url |
| `rekha_partnerships` | Partnerships | id, partner_name, logo_url |
| `rekha_vtd_books` | VTD books | id, title, pdf_url |
| `rekha_inkspire_books` | Inkspire books | id, title, pdf_url |
| `rekha_enquiries` | Contact forms | id, name, email, message |
| `rekha_forms` | Registration forms | id, form_type, form_data |

**No migrations needed** - Tables auto-create on first use.

### 4. Image Upload Flow

```
Admin selects file
  → POST /api/v1/s3/upload (with file + folder name)
  → Backend uploads to S3 bucket
  → Returns public URL: https://bucket.s3.../news/filename.jpg
  → Admin form stores this URL
  → When saving, URL goes into DynamoDB
  → Public pages load images directly from S3
```

---

## 🛠️ Common Tasks

### Add a New Public Page

1. **Create page component:** `src/pages/mypage/index.js`
2. **Add route:** Edit `src/App.js`
   ```javascript
   import MyPage from './pages/mypage';
   // ...
   <Route path="/mypage" element={<MyPage />} />
   ```
3. **Add nav link:** Edit `src/components/Layout/Header/MenuItems.js`
   ```javascript
   <li className={parentMenu === 'MyPage' ? 'current-menu-item' : ''}>
     <Link to="/mypage">My Page</Link>
   </li>
   ```

### Add a New API Endpoint

1. **Create schema:** `blog-backend/app/schemas/myentity.py`
2. **Create DB handler:** `blog-backend/app/db/myentity_db.py`
3. **Create service:** `blog-backend/app/services/myentity_service.py`
4. **Create endpoint:** `blog-backend/app/api/v1/endpoints/myentity.py`
5. **Register router:** Edit `blog-backend/app/api/v1/api.py`
   ```python
   from app.api.v1.endpoints import myentity
   api_router.include_router(myentity.router, prefix="/myentity", tags=["MyEntity"])
   ```

### Add New Admin Section

1. **Create manager:** `src/pages/admin/sections/MyManager.js`
   - Copy pattern from `NewsManager.js` or `BlogManager.js`
2. **Register in dashboard:** Edit `src/pages/admin/AdminDashboard.js`
   ```javascript
   import MyManager from './sections/MyManager';
   
   // Add to MENU_ITEMS
   { id: 'mysection', label: 'My Section', icon: 'icon-name' }
   
   // Add to renderContent() switch
   case 'mysection': return <MyManager />;
   ```

---

## 🔐 Authentication

### How It Works

1. **Admin logs in** at `/admin`
2. **Backend verifies** credentials (from `.env`)
3. **JWT token generated** (30-day expiry)
4. **Token stored** in `localStorage.adminToken`
5. **Axios auto-injects** token in all API calls
6. **Backend verifies** token via `verify_token()` dependency

### Protected Endpoints

All `POST`, `PUT`, `DELETE` operations require authentication:

```python
@router.post("/news/")
async def create_news(
    news: NewsCreate,
    current_user: dict = Depends(verify_token)  # ← Auth required
):
    return news_service.create_news(news.dict())
```

Public `GET` endpoints don't need auth:

```python
@router.get("/news/")
async def list_news():  # No auth
    return news_service.get_all_news()
```

---

## 📡 API Reference (Most Used)

### Public Endpoints (No Auth)

```bash
GET  /api/v1/news/                    # List all published news
GET  /api/v1/news/{slug}              # Get news by slug
GET  /api/v1/blog/                    # List all blogs
GET  /api/v1/committee/               # List team members
GET  /api/v1/referees/                # List referees
GET  /api/v1/results/                 # List results
POST /api/v1/enquiries/               # Submit contact form
```

### Admin Endpoints (Require Auth)

```bash
POST   /api/v1/auth/login             # Login (get JWT token)
POST   /api/v1/news/                  # Create news
PUT    /api/v1/news/{id}              # Update news
DELETE /api/v1/news/{id}              # Delete news
POST   /api/v1/s3/upload              # Upload image/file
GET    /api/v1/enquiries/             # View contact submissions
```

**Test API:** http://localhost:8000/docs (interactive Swagger UI)

---

## 🐛 Troubleshooting

### Frontend won't start

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Backend 500 error

```bash
# Check AWS credentials in .env
# Check DynamoDB table exists (auto-created on first use)
# View logs in terminal
```

### Images not loading

- Frontend: Use `../../assets/images/filename.png` in CSS
- Backend: Images must be uploaded to S3 first, then use returned URL
- Check S3 bucket is public-read

### Can't login to admin

- Check `ADMIN_USERNAME` and `ADMIN_PASSWORD` in backend `.env`
- Default: admin / changeme123
- Clear localStorage and try again

### CORS errors

- Backend must be running on port 8000
- Frontend `.env` must have correct `REACT_APP_API_URL`
- Check CORS settings in `blog-backend/main.py`

---

## 📦 Dependencies

### Frontend (package.json)

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-router-dom": "^6.x",
    "axios": "latest",
    "react-pdf": "latest"
  }
}
```

### Backend (requirements.txt)

```
fastapi
uvicorn[standard]
boto3              # AWS SDK
python-jose[cryptography]  # JWT
pydantic
python-multipart   # File uploads
```

---

## 🚀 Production Deployment

### Build Frontend

```bash
npm run build
# Output: /build/ folder
# Serve with Nginx or any static server
```

### Run Backend with PM2

```bash
# Install PM2
npm install -g pm2

# Start backend
cd blog-backend
pm2 start main.py --interpreter python --name wpc-backend

# Save and auto-start on reboot
pm2 save
pm2 startup
```

### Nginx Config (Example)

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Serve React build
    location / {
        root /path/to/Powerlift/build;
        try_files $uri /index.html;
    }
    
    # Proxy API to backend
    location /api/ {
        proxy_pass http://localhost:8000;
    }
}
```

---

## 📞 Need Help?

### Useful Commands

```bash
# Backend
uvicorn main:app --reload          # Dev mode
pm2 logs wpc-backend               # View logs

# Frontend
npm start                          # Dev mode
npm run build                      # Production build

# AWS
aws dynamodb list-tables           # List DynamoDB tables
aws s3 ls s3://bucket-name/        # List S3 files
```

### Documentation Files

- `ARCHITECTURE.md` - Full technical specs
- `DIAGRAMS.md` - Visual diagrams & flows
- `README.md` - Project overview

### Check These First

1. Is backend running? → http://localhost:8000/docs
2. Are AWS credentials set? → Check `.env`
3. Is frontend connecting to backend? → Check browser console
4. Are tables created? → Check DynamoDB AWS console

---

## 🎯 Recent Updates (Latest Session)

### ✅ What's New (July 2026)

1. **News & Media Module** - Complete system for newspaper coverage, announcements
   - Frontend: `/news` page with lightbox gallery
   - Backend: News CRUD API
   - Admin: NewsManager with image upload
   - Database: `rekha_news` DynamoDB table

2. **WhatsApp Floating Button** - All pages now have WhatsApp contact (7330778111)

3. **CSS Fixes** - Navbar styling with powerlift-panel.png background

### 📝 Key Files Modified

```
NEW FILES:
  src/pages/news/News.css
  src/pages/news/NewsMain.js
  src/pages/news/index.js
  src/pages/admin/sections/NewsManager.js
  src/components/Common/WhatsAppFloat.js
  blog-backend/app/db/news_db.py
  blog-backend/app/schemas/news.py
  blog-backend/app/services/news_service.py
  blog-backend/app/api/v1/endpoints/news.py

MODIFIED:
  src/App.js (added News route, WhatsApp)
  src/components/Layout/Header/MenuItems.js (added News link)
  src/pages/admin/AdminDashboard.js (added NewsManager)
  blog-backend/app/api/v1/api.py (registered news router)
```

---

**Ready to code!** 🚀

Start with exploring the code, then refer to full docs when needed.
