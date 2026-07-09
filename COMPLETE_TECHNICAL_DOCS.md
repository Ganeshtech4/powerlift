# WPC Telangana - Complete Technical Documentation Package

**Prepared for Client's Technical Team**
**Date:** July 2026

---

# PART 1: DOCUMENTATION INDEX

 # ðŸ“š Technical Documentation Index

**WPC Telangana - Developer Documentation**

---

## ðŸ“– Documentation Files

This project includes comprehensive technical documentation for onboarding and development.

### Quick Reference

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **[HANDOVER.md](./HANDOVER.md)** | Main entry point & overview | Start here for onboarding |
| **[SETUP.md](./SETUP.md)** | Quick start & setup guide | Setting up dev environment |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Complete technical specs | Understanding system details |
| **[DIAGRAMS.md](./DIAGRAMS.md)** | Visual architecture & flows | Understanding data flow |

---

## ðŸŽ¯ Recommended Reading Order

### For New Developers
1. **[HANDOVER.md](./HANDOVER.md)** - Overview & introduction
2. **[SETUP.md](./SETUP.md)** - Get the project running
3. **[DIAGRAMS.md](./DIAGRAMS.md)** - Understand the architecture
4. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Deep dive into specs

### For Quick Setup
1. **[SETUP.md](./SETUP.md)** - Jump straight to setup
2. **[DIAGRAMS.md](./DIAGRAMS.md)** - Visual reference as needed

### For Understanding Existing Code
1. **[DIAGRAMS.md](./DIAGRAMS.md)** - See how components connect
2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed specifications

---

## ðŸ“‹ Document Contents

### [HANDOVER.md](./HANDOVER.md)
- Project overview
- System architecture summary
- Quick start guide
- Database tables overview
- API endpoints summary
- Common tasks
- Troubleshooting basics
- Deployment overview
- Handover checklist
- Learning path for new team

### [SETUP.md](./SETUP.md)
- Prerequisites
- 5-minute quick setup
- Development environment configuration
- Common development tasks
- Code patterns and examples
- Troubleshooting guide
- Useful commands
- Recent updates

### [ARCHITECTURE.md](./ARCHITECTURE.md)
- Complete technology stack
- Detailed system architecture
- Frontend structure & patterns
- Backend structure & layered design
- Database schemas (all 10 tables)
- S3 storage configuration
- API authentication flow
- Complete endpoint reference
- Deployment architecture
- Environment configuration
- Security considerations

### [DIAGRAMS.md](./DIAGRAMS.md)
- System architecture diagram
- Request flow diagrams
- Authentication flow
- Admin CRUD operations flow
- Database structure visualization
- S3 storage structure
- Error handling hierarchy
- Deployment workflow

---

## ðŸ” Find Information By Topic

| Topic | Document | Section |
|-------|----------|---------|
| **Quick Setup** | [SETUP.md](./SETUP.md) | Quick Start (5 Minutes) |
| **Tech Stack** | [HANDOVER.md](./HANDOVER.md) | Technology Stack Summary |
| **Architecture** | [DIAGRAMS.md](./DIAGRAMS.md) | System Architecture Overview |
| **Database** | [ARCHITECTURE.md](./ARCHITECTURE.md) | Database Structure |
| **API Endpoints** | [ARCHITECTURE.md](./ARCHITECTURE.md) | Complete Endpoint List |
| **Authentication** | [DIAGRAMS.md](./DIAGRAMS.md) | Authentication Flow Diagram |
| **Deployment** | [ARCHITECTURE.md](./ARCHITECTURE.md) | Deployment Architecture |
| **Troubleshooting** | [SETUP.md](./SETUP.md) | Troubleshooting |
| **Data Flow** | [DIAGRAMS.md](./DIAGRAMS.md) | Request Flow sections |
| **File Structure** | [HANDOVER.md](./HANDOVER.md) | Project Structure |

---

## ðŸš€ Quick Links

**Development:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`
- Admin Panel: `http://localhost:3000/admin`

**Key Directories:**
- Frontend: `src/`
- Backend: `blog-backend/`
- Admin Components: `src/pages/admin/`
- API Endpoints: `blog-backend/app/api/v1/endpoints/`

**Configuration:**
- Backend: `blog-backend/.env`
- Frontend: `.env`
- Backend Config: `blog-backend/app/core/config.py`
- API Client: `src/config/axiosConfig.js`

---

## ðŸ“ž Getting Help

1. **Check the docs** - Most questions answered in these files
2. **Review diagrams** - Visual understanding helps
3. **Test in API docs** - Interactive testing at `/docs`
4. **Read the code** - Well-structured and commented

---

**Ready to start?** Begin with [HANDOVER.md](./HANDOVER.md) ðŸš€


---

# PART 2: HANDOVER GUIDE

# ðŸ“š Technical Handover Documentation - WPC Telangana

**Prepared for Client's New Technical Team**  
**Date:** July 2026  
**Project:** WPC Telangana Federation Website

---

## ðŸ“– Documentation Overview

This handover package contains comprehensive technical documentation to help your new development team understand and maintain the WPC Telangana website.

### ðŸ“‹ Document Index

1. **[SETUP.md](./SETUP.md)** âš¡
   - **Start here!** Fast 5-minute setup
   - Essential commands and common tasks
   - Troubleshooting tips
   - Perfect for: Getting up and running quickly

2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** ðŸ“–
   - Complete technical specifications
   - Detailed architecture explanation
   - All database schemas and API endpoints
   - Security and deployment guidelines
   - Perfect for: In-depth understanding

3. **[DIAGRAMS.md](./DIAGRAMS.md)** ðŸŽ¨
   - Visual system architecture
   - Data flow diagrams
   - Request/response patterns
   - Authentication flows
   - Perfect for: Visual learners

---

## ðŸŽ¯ What This System Does

**WPC Telangana** is a full-stack web application for managing a powerlifting federation with:

âœ… Public website (news, events, gallery, results, team info)  
âœ… Admin dashboard (content management)  
âœ… News & media management (newspaper coverage, announcements)  
âœ… Championship results tracking  
âœ… Referee and team member management  
âœ… Interactive book readers (VTD & Inkspire)  
âœ… Registration forms and enquiry system  
âœ… WhatsApp integration for direct contact

---

## ðŸ—ï¸ System Architecture (At a Glance)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚   BROWSER    â”‚
â”‚   (Users)    â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
       â”‚                     â”‚
       â–¼                     â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  FRONTEND   â”‚â”€â”€â”€â”€â–¶â”‚   BACKEND    â”‚
â”‚  React SPA  â”‚     â”‚   FastAPI    â”‚
â”‚  Port 3000  â”‚     â”‚   Port 8000  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”˜
                           â”‚
                    â”Œâ”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”
                    â”‚             â”‚
                    â–¼             â–¼
              â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”
              â”‚ DynamoDB â”‚  â”‚  AWS S3 â”‚
              â”‚ Database â”‚  â”‚ Storage â”‚
              â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Technology Stack Summary

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 18, React Router, Axios |
| **Backend** | Python FastAPI, Uvicorn |
| **Database** | AWS DynamoDB (10 tables) |
| **Storage** | AWS S3 (images, PDFs) |
| **Auth** | JWT tokens (30-day expiry) |
| **Deployment** | PM2, Nginx (recommended) |

---

## ðŸš€ Quick Start (5 Minutes)

### Prerequisites
```bash
âœ“ Node.js 16+
âœ“ Python 3.9+
âœ“ AWS credentials
```

### Setup Commands

```bash
# 1. Clone repository
git clone <repository-url>
cd Powerlift

# 2. Backend setup
cd blog-backend
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt

# 3. Configure .env files (see QUICK_START_GUIDE.md)

# 4. Start backend
uvicorn main:app --reload --port 8000

# 5. Start frontend (new terminal)
cd ..
npm install
npm start
```

### Access Points
- **Frontend:** http://localhost:3000
- **API Docs:** http://localhost:8000/docs (interactive)
- **Admin Panel:** http://localhost:3000/admin
  - Default login: `admin` / `changeme123`

---

## ðŸ“Š Database Tables (DynamoDB)

All tables auto-create on first use. No migrations needed.

| Table Name | Purpose | Key Fields |
|------------|---------|------------|
| `rekha_news` | News & media **(NEW)** | id, title, image_url, status |
| `rekha_blogs` | Blog posts | id, title, description |
| `rekha_committee_members` | Team members | id, name, designation |
| `rekha_referees` | Referees | id, name, category, certificate |
| `rekha_results` | Competition results | id, event_date, pdf_url |
| `rekha_partnerships` | Partnerships | id, partner_name, logo |
| `rekha_vtd_books` | VTD books | id, title, pdf_url |
| `rekha_inkspire_books` | Inkspire books | id, title, pdf_url |
| `rekha_enquiries` | Contact forms | id, name, email, message |
| `rekha_forms` | Registration forms | id, form_type, form_data |

---

## ðŸ” Authentication System

### Admin Login Flow
1. User visits `/admin` and enters credentials
2. Backend verifies against `.env` settings
3. JWT token generated (30-day expiry)
4. Token stored in browser `localStorage`
5. All API calls auto-include token in headers
6. Token verified on protected endpoints

### Credentials Location
- **Backend:** `blog-backend/.env`
  ```
  ADMIN_USERNAME=admin
  ADMIN_PASSWORD=your_secure_password
  SECRET_KEY=your-jwt-secret-key
  ```

---

## ðŸ“¡ API Endpoints Overview

### Public (No Auth Required)
```
GET  /api/v1/news/              List published news
GET  /api/v1/blog/              List blog posts
GET  /api/v1/committee/         List team members
GET  /api/v1/referees/          List referees
GET  /api/v1/results/           List competition results
POST /api/v1/enquiries/         Submit contact form
```

### Admin (Auth Required)
```
POST   /api/v1/auth/login       Get JWT token
POST   /api/v1/news/            Create news
PUT    /api/v1/news/{id}        Update news
DELETE /api/v1/news/{id}        Delete news
POST   /api/v1/s3/upload        Upload file to S3
```

**Full list:** See `ARCHITECTURE.md` section "Complete Endpoint List"

---

## ðŸ—‚ï¸ Project Structure

```
Powerlift/
â”‚
â”œâ”€â”€ src/                          # FRONTEND (React)
â”‚   â”œâ”€â”€ pages/                    # Page components
â”‚   â”‚   â”œâ”€â”€ news/                 # News page (NEW)
â”‚   â”‚   â”œâ”€â”€ admin/                # Admin dashboard
â”‚   â”‚   â”‚   â””â”€â”€ sections/         # Admin manager components
â”‚   â”‚   â”œâ”€â”€ home/
â”‚   â”‚   â”œâ”€â”€ gallery/
â”‚   â”‚   â””â”€â”€ ...
â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ Layout/               # Header, Footer
â”‚   â”‚   â””â”€â”€ Common/               # Reusable components
â”‚   â”œâ”€â”€ config/
â”‚   â”‚   â””â”€â”€ axiosConfig.js        # API client setup
â”‚   â””â”€â”€ assets/
â”‚       â””â”€â”€ css/eventflow.css     # Main stylesheet
â”‚
â”œâ”€â”€ blog-backend/                 # BACKEND (FastAPI)
â”‚   â”œâ”€â”€ main.py                   # App entry point
â”‚   â”œâ”€â”€ app/
â”‚   â”‚   â”œâ”€â”€ api/v1/endpoints/     # API routes
â”‚   â”‚   â”‚   â”œâ”€â”€ news.py           # News CRUD (NEW)
â”‚   â”‚   â”‚   â”œâ”€â”€ blog.py
â”‚   â”‚   â”‚   â”œâ”€â”€ auth.py
â”‚   â”‚   â”‚   â””â”€â”€ ...
â”‚   â”‚   â”œâ”€â”€ services/             # Business logic
â”‚   â”‚   â”œâ”€â”€ schemas/              # Pydantic models
â”‚   â”‚   â”œâ”€â”€ db/                   # DynamoDB connections
â”‚   â”‚   â””â”€â”€ core/
â”‚   â”‚       â”œâ”€â”€ config.py         # Environment settings
â”‚   â”‚       â””â”€â”€ security.py       # JWT utilities
â”‚   â””â”€â”€ requirements.txt
â”‚
â”œâ”€â”€ public/                       # Static assets
â”‚   â””â”€â”€ images/
â”‚
â”œâ”€â”€ SETUP.md                      # âš¡ Start here!
â”œâ”€â”€ ARCHITECTURE.md               # ðŸ“– Full specs
â”œâ”€â”€ DIAGRAMS.md                   # ðŸŽ¨ Visual diagrams
â””â”€â”€ HANDOVER.md                   # ðŸ“‹ This file
```

---

## ðŸ†• Recent Updates (Latest Session - July 2026)

### New Features Added

1. **News & Media Module** ðŸ“°
   - Public news page: `/news`
   - Admin management: `/admin/dashboard?section=news`
   - Features: Image lightbox, featured items, category filters
   - Database: New `rekha_news` DynamoDB table
   - API: Complete CRUD endpoints

2. **WhatsApp Integration** ðŸ’¬
   - Floating WhatsApp button on all pages
   - Direct chat to: +91 7330778111

3. **UI Enhancements** ðŸŽ¨
   - Navbar background with gradient stripes
   - Improved mobile navigation
   - CSS fixes for global color issues

### Files Created/Modified
See detailed list in `SETUP.md` section "Recent Updates"

---

## ðŸ› ï¸ Common Development Tasks

### Adding a New Page
1. Create component in `src/pages/mypage/`
2. Add route in `src/App.js`
3. Add navigation link in `MenuItems.js`

### Adding a New API Endpoint
1. Create schema in `schemas/`
2. Create DB handler in `db/`
3. Create service in `services/`
4. Create endpoint in `api/v1/endpoints/`
5. Register in `api/v1/api.py`

### Adding Admin Section
1. Create manager in `src/pages/admin/sections/`
2. Add to `MENU_ITEMS` in `AdminDashboard.js`
3. Add case to `renderContent()` switch

**Detailed steps:** See `SETUP.md` section "Common Tasks"

---

## ðŸ› Troubleshooting

### Quick Fixes

| Problem | Solution |
|---------|----------|
| Frontend won't start | `rm -rf node_modules && npm install` |
| Backend 500 error | Check AWS credentials in `.env` |
| Images not loading | Check S3 bucket permissions & URLs |
| Can't login | Verify credentials in backend `.env` |
| CORS errors | Check `REACT_APP_API_URL` in frontend `.env` |

**Full troubleshooting:** See `SETUP.md` section "Troubleshooting"

---

## ðŸš€ Production Deployment

### Backend
```bash
# Using PM2
pm2 start blog-backend/main.py --interpreter python --name wpc-backend
pm2 save
pm2 startup
```

### Frontend
```bash
# Build production bundle
npm run build

# Output folder: /build/
# Serve with Nginx or static hosting
```

**Detailed deployment:** See `ARCHITECTURE.md` section "Deployment Architecture"

---

## ðŸ“ž Support & Resources

### Environment Configuration Required

**Backend `.env`:**
```bash
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=wpc-telangana-assets
ADMIN_USERNAME=admin
ADMIN_PASSWORD=...
SECRET_KEY=...
```

**Frontend `.env`:**
```bash
REACT_APP_API_URL=http://localhost:8000/api/v1
```

### AWS Resources
- **Region:** ap-south-1 (Mumbai)
- **S3 Bucket:** wpc-telangana-assets
- **DynamoDB:** 10 tables with `rekha_` prefix

### Useful Commands
```bash
# Backend
uvicorn main:app --reload          # Dev server
pm2 logs wpc-backend               # View logs

# Frontend  
npm start                          # Dev server
npm run build                      # Production build

# AWS
aws dynamodb list-tables           # List tables
aws s3 ls s3://bucket-name/        # List S3 files
```

---

## ðŸ“š Where to Find Information

| Need to... | Read this document |
|------------|-------------------|
| Get started quickly | `SETUP.md` |
| Understand system architecture | `DIAGRAMS.md` |
| See API endpoints | `ARCHITECTURE.md` |
| Add new features | All three documents |
| Troubleshoot issues | `SETUP.md` |
| Deploy to production | `ARCHITECTURE.md` |

---

## âœ… Handover Checklist

Before starting development, ensure:

- [ ] AWS credentials obtained and configured
- [ ] `.env` files created (backend and frontend)
- [ ] Admin login credentials set and tested
- [ ] Backend runs successfully (`uvicorn main:app --reload`)
- [ ] Frontend runs successfully (`npm start`)
- [ ] Admin panel accessible at http://localhost:3000/admin
- [ ] API docs accessible at http://localhost:8000/docs
- [ ] Can create/edit/delete news items
- [ ] Can upload images to S3
- [ ] All three documentation files reviewed

---

## ðŸŽ“ Learning Path for New Team

### Day 1: Setup & Familiarization
1. Read `SETUP.md` (30 min)
2. Set up development environment (1 hour)
3. Explore admin dashboard (30 min)
4. Review `DIAGRAMS.md` (30 min)

### Day 2: Deep Dive
1. Read `ARCHITECTURE.md` (2 hours)
2. Trace a request from frontend â†’ backend â†’ database
3. Make a small change (add a field to news)
4. Test the full CRUD flow

### Day 3: Practice
1. Add a new admin section (follow existing patterns)
2. Create a new API endpoint
3. Deploy to staging environment

---

## ðŸ“ Notes for Development Team

### Code Quality
- Frontend follows React best practices
- Backend uses FastAPI async patterns
- All endpoints documented with Swagger/OpenAPI

### Security Considerations
- Change default admin password immediately
- Rotate JWT secret key in production
- Configure CORS for specific domains only
- Enable HTTPS in production

### Scalability
- DynamoDB pay-per-request (no capacity planning)
- S3 automatically scales
- Backend can be horizontally scaled with load balancer

### Maintenance
- Regular dependency updates recommended
- Monitor AWS costs (DynamoDB + S3)
- Backup strategy: Enable DynamoDB PITR + S3 versioning

---

## ðŸ¤ Questions?

If you have questions or need clarification:

1. **Check the docs:** Most questions answered in the three documentation files
2. **Review the code:** Well-structured and commented
3. **Test the API:** Interactive docs at `/docs` endpoint
4. **Contact original developer:** [Your contact information]

---

**Welcome to the WPC Telangana project!** ðŸŽ‰

The system is production-ready and well-documented. Start with the `SETUP.md` and you'll be productive within the first day.

**Happy coding!** ðŸš€

---

**Document Version:** 1.0  
**Last Updated:** July 2026  
**Status:** Ready for Handover âœ…


---

# PART 3: SETUP GUIDE

# WPC Telangana - Quick Start Guide for New Tech Team

**Fast-track onboarding document**

---

## ðŸš€ Quick Setup (5 Minutes)

### Prerequisites
```bash
âœ“ Node.js 16+ installed
âœ“ Python 3.9+ installed
âœ“ AWS account credentials ready
âœ“ Git installed
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

## ðŸ“Š Tech Stack at a Glance

| Layer | Technology | Port |
|-------|-----------|------|
| **Frontend** | React 18 + React Router | 3000 |
| **Backend** | FastAPI (Python) | 8000 |
| **Database** | AWS DynamoDB (10 tables) | - |
| **Storage** | AWS S3 (public bucket) | - |
| **Auth** | JWT tokens (30 days) | - |

---

## ðŸ—‚ï¸ Project Structure (Key Folders)

```
Powerlift/
â”œâ”€â”€ src/                          # FRONTEND
â”‚   â”œâ”€â”€ pages/                    # Page components
â”‚   â”‚   â”œâ”€â”€ news/                 # News page (NEW)
â”‚   â”‚   â”œâ”€â”€ admin/                # Admin dashboard
â”‚   â”‚   â””â”€â”€ ...                   # Other pages
â”‚   â”œâ”€â”€ components/               # Reusable components
â”‚   â”‚   â”œâ”€â”€ Layout/Header/        # Navbar
â”‚   â”‚   â””â”€â”€ Common/               # Shared components
â”‚   â”œâ”€â”€ config/
â”‚   â”‚   â””â”€â”€ axiosConfig.js        # â­ API client setup
â”‚   â””â”€â”€ assets/css/
â”‚       â””â”€â”€ eventflow.css         # Main stylesheet
â”‚
â”œâ”€â”€ blog-backend/                 # BACKEND
â”‚   â”œâ”€â”€ main.py                   # â­ App entry point
â”‚   â”œâ”€â”€ app/
â”‚   â”‚   â”œâ”€â”€ api/v1/endpoints/     # API routes
â”‚   â”‚   â”‚   â”œâ”€â”€ news.py           # News CRUD (NEW)
â”‚   â”‚   â”‚   â”œâ”€â”€ blog.py
â”‚   â”‚   â”‚   â””â”€â”€ ...
â”‚   â”‚   â”œâ”€â”€ services/             # Business logic
â”‚   â”‚   â”‚   â””â”€â”€ news_service.py   # News operations (NEW)
â”‚   â”‚   â”œâ”€â”€ schemas/              # Request/response models
â”‚   â”‚   â”‚   â””â”€â”€ news.py           # News schema (NEW)
â”‚   â”‚   â”œâ”€â”€ db/                   # DynamoDB connections
â”‚   â”‚   â”‚   â””â”€â”€ news_db.py        # News table (NEW)
â”‚   â”‚   â””â”€â”€ core/
â”‚   â”‚       â”œâ”€â”€ config.py         # â­ Environment settings
â”‚   â”‚       â””â”€â”€ security.py       # JWT auth
â”‚   â””â”€â”€ requirements.txt
â”‚
â””â”€â”€ public/images/                # Public static assets
```

---

## ðŸ”‘ Key Concepts

### 1. How Data Flows

```
User clicks on "News" 
  â†’ React loads /news page
  â†’ Fetches GET /api/v1/news/?published_only=true
  â†’ Backend queries DynamoDB rekha_news table
  â†’ Returns JSON with image URLs (from S3)
  â†’ React displays news grid with images
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
  â†’ POST /api/v1/s3/upload (with file + folder name)
  â†’ Backend uploads to S3 bucket
  â†’ Returns public URL: https://bucket.s3.../news/filename.jpg
  â†’ Admin form stores this URL
  â†’ When saving, URL goes into DynamoDB
  â†’ Public pages load images directly from S3
```

---

## ðŸ› ï¸ Common Tasks

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

## ðŸ” Authentication

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
    current_user: dict = Depends(verify_token)  # â† Auth required
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

## ðŸ“¡ API Reference (Most Used)

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

## ðŸ› Troubleshooting

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

## ðŸ“¦ Dependencies

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

## ðŸš€ Production Deployment

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

## ðŸ“ž Need Help?

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

1. Is backend running? â†’ http://localhost:8000/docs
2. Are AWS credentials set? â†’ Check `.env`
3. Is frontend connecting to backend? â†’ Check browser console
4. Are tables created? â†’ Check DynamoDB AWS console

---

## ðŸŽ¯ Recent Updates (Latest Session)

### âœ… What's New (July 2026)

1. **News & Media Module** - Complete system for newspaper coverage, announcements
   - Frontend: `/news` page with lightbox gallery
   - Backend: News CRUD API
   - Admin: NewsManager with image upload
   - Database: `rekha_news` DynamoDB table

2. **WhatsApp Floating Button** - All pages now have WhatsApp contact (7330778111)

3. **CSS Fixes** - Navbar styling with powerlift-panel.png background

### ðŸ“ Key Files Modified

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

**Ready to code!** ðŸš€

Start with exploring the code, then refer to full docs when needed.


---

# PART 4: TECHNICAL ARCHITECTURE

# WPC Telangana - Technical Documentation

**Version:** 1.0  
**Last Updated:** July 2026  
**Prepared for:** Client Technical Team Onboarding

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Diagram](#architecture-diagram)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [Database Structure](#database-structure)
7. [Storage & Media Management](#storage--media-management)
8. [API Flow & Authentication](#api-flow--authentication)
9. [Deployment Architecture](#deployment-architecture)
10. [Environment Configuration](#environment-configuration)
11. [Key Integration Points](#key-integration-points)

---

## System Overview

WPC Telangana is a full-stack web application for managing a powerlifting federation. The system handles:
- Public-facing website with news, events, results, and resources
- Admin dashboard for content management
- Gallery and blog management
- User registration and referee management
- Interactive book readers (VTD & Inkspire)
- Championship results and calendars
- Partnership and collaboration tracking

**Live URL:** [Your production URL]  
**Admin Panel:** `/admin/dashboard`

---

## Technology Stack

### Frontend
| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | React.js | 18.x |
| **Routing** | React Router DOM | 6.x |
| **HTTP Client** | Axios | Latest |
| **PDF Viewer** | react-pdf | Latest |
| **Build Tool** | Create React App | Latest |
| **Styling** | Custom CSS (eventflow.css) | - |
| **Icons** | Font Awesome 5 | 5.x |

### Backend
| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | FastAPI | Latest |
| **Language** | Python | 3.9+ |
| **ASGI Server** | Uvicorn | Latest |
| **Validation** | Pydantic | Latest |
| **Authentication** | JWT (python-jose) | Latest |

### Database & Storage
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Primary Database** | AWS DynamoDB | NoSQL document storage |
| **Media Storage** | AWS S3 | Images, PDFs, documents |
| **Billing Mode** | Pay Per Request | DynamoDB auto-scaling |

### DevOps & Deployment
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Process Manager** | PM2 | Backend process management |
| **Web Server** | Nginx (recommended) | Reverse proxy & static files |
| **Environment** | Python venv | Backend isolation |

---

## Architecture Diagram

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                        CLIENT BROWSER                        â”‚
â”‚                    (React SPA - Port 3000)                   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                             â”‚
                             â”‚ HTTP/HTTPS
                             â”‚
                â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                â”‚   NGINX (Optional)       â”‚
                â”‚   Reverse Proxy          â”‚
                â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                             â”‚
        â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
        â”‚                    â”‚                    â”‚
        â–¼                    â–¼                    â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  React Static â”‚   â”‚   FastAPI      â”‚   â”‚   AWS S3     â”‚
â”‚    Assets     â”‚   â”‚   Backend      â”‚   â”‚   Storage    â”‚
â”‚  (Build dir)  â”‚   â”‚  Port 8000     â”‚   â”‚  (Public)    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                             â”‚
                             â”‚ Boto3 SDK
                             â”‚
                    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                    â”‚   AWS DynamoDB    â”‚
                    â”‚  (NoSQL Tables)   â”‚
                    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                    â”‚
                    â”œâ”€ rekha_blogs
                    â”œâ”€ rekha_committee_members
                    â”œâ”€ rekha_referees
                    â”œâ”€ rekha_results
                    â”œâ”€ rekha_partnerships
                    â”œâ”€ rekha_vtd_books
                    â”œâ”€ rekha_inkspire_books
                    â”œâ”€ rekha_enquiries
                    â”œâ”€ rekha_forms
                    â””â”€ rekha_news
```

---

## Frontend Architecture

### Directory Structure
```
src/
â”œâ”€â”€ assets/
â”‚   â”œâ”€â”€ css/
â”‚   â”‚   â””â”€â”€ eventflow.css          # Main stylesheet (13000+ lines)
â”‚   â”œâ”€â”€ images/                    # Static images
â”‚   â””â”€â”€ vendors/                   # Third-party CSS/JS
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ Layout/
â”‚   â”‚   â”œâ”€â”€ Header/
â”‚   â”‚   â”‚   â”œâ”€â”€ Header.js
â”‚   â”‚   â”‚   â”œâ”€â”€ MenuItems.js       # Navigation menu
â”‚   â”‚   â”‚   â””â”€â”€ MobileMenu.js      # Mobile hamburger menu
â”‚   â”‚   â””â”€â”€ Footer/
â”‚   â”œâ”€â”€ Common/
â”‚   â”‚   â”œâ”€â”€ BackToTop.js
â”‚   â”‚   â””â”€â”€ WhatsAppFloat.js       # Floating WhatsApp button
â”‚   â””â”€â”€ Admin/                     # Admin dashboard components
â”œâ”€â”€ pages/
â”‚   â”œâ”€â”€ home/                      # Homepage
â”‚   â”œâ”€â”€ about/                     # About & team pages
â”‚   â”œâ”€â”€ gallery/                   # Photo gallery
â”‚   â”œâ”€â”€ blog/                      # Blog (gallery-blog)
â”‚   â”œâ”€â”€ news/                      # News & media (NEW)
â”‚   â”œâ”€â”€ Results/                   # Championship results
â”‚   â”œâ”€â”€ Districts/                 # District information
â”‚   â”œâ”€â”€ referees/                  # Referee management
â”‚   â”œâ”€â”€ inspire/                   # Inkspire books
â”‚   â”œâ”€â”€ vtd/                       # VTD books
â”‚   â”œâ”€â”€ contact/                   # Contact form
â”‚   â”œâ”€â”€ registration/              # Registration forms
â”‚   â””â”€â”€ admin/
â”‚       â”œâ”€â”€ AdminLogin.js
â”‚       â”œâ”€â”€ AdminDashboard.js
â”‚       â””â”€â”€ sections/              # Admin manager components
â”‚           â”œâ”€â”€ BlogManager.js
â”‚           â”œâ”€â”€ TeamManager.js
â”‚           â”œâ”€â”€ RefereesManager.js
â”‚           â”œâ”€â”€ ResultsManager.js
â”‚           â”œâ”€â”€ PartnershipsManager.js
â”‚           â”œâ”€â”€ VtdBooksManager.js
â”‚           â”œâ”€â”€ InkspireBooksManager.js
â”‚           â”œâ”€â”€ FormsManager.js
â”‚           â””â”€â”€ NewsManager.js     # News management (NEW)
â”œâ”€â”€ config/
â”‚   â”œâ”€â”€ axiosConfig.js             # HTTP client configuration
â”‚   â””â”€â”€ emailConfig.js             # Email service config
â””â”€â”€ utils/
    â”œâ”€â”€ s3Upload.js                # S3 upload utilities
    â”œâ”€â”€ teamApi.js
    â”œâ”€â”€ refereeApi.js
    â””â”€â”€ vtdApi.js
```

### Key Frontend Patterns

#### 1. Routing (`App.js`)
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public routes
<Route path="/" element={<Home />} />
<Route path="/gallery" element={<Gallery />} />
<Route path="/news" element={<NewsPage />} />

// Admin routes (protected)
<Route path="/admin" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
```

#### 2. API Client Configuration (`config/axiosConfig.js`)
```javascript
const API_URL = process.env.REACT_APP_API_URL || '/api/v1';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Auto-inject JWT token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

#### 3. Admin Dashboard Pattern
- URL-based section routing: `/admin/dashboard?section=news`
- Single `AdminDashboard.js` with `renderContent()` switch
- Modular manager components in `sections/`
- Shared stats grid, filter tabs, search, CRUD actions

#### 4. Image Loading Strategy
```javascript
// S3 images loaded directly via URL
<img src={item.image_url} alt={item.title} />

// Local assets via imports
import logo from '../../assets/images/logo.png';

// CSS backgrounds (relative paths from CSS file)
background: url('../../assets/images/powerlift-panel.png');
```

---

## Backend Architecture

### Directory Structure
```
blog-backend/
â”œâ”€â”€ main.py                        # Application entry point
â”œâ”€â”€ requirements.txt               # Python dependencies
â”œâ”€â”€ Procfile                       # Deployment config
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ __init__.py
â”‚   â”œâ”€â”€ core/
â”‚   â”‚   â”œâ”€â”€ config.py              # Environment & settings
â”‚   â”‚   â””â”€â”€ security.py            # JWT auth utilities
â”‚   â”œâ”€â”€ api/
â”‚   â”‚   â””â”€â”€ v1/
â”‚   â”‚       â”œâ”€â”€ api.py             # Main router aggregator
â”‚   â”‚       â””â”€â”€ endpoints/
â”‚   â”‚           â”œâ”€â”€ auth.py        # Admin login
â”‚   â”‚           â”œâ”€â”€ blog.py        # Blog posts
â”‚   â”‚           â”œâ”€â”€ committee.py   # Team members
â”‚   â”‚           â”œâ”€â”€ referees.py
â”‚   â”‚           â”œâ”€â”€ results.py
â”‚   â”‚           â”œâ”€â”€ partnerships.py
â”‚   â”‚           â”œâ”€â”€ vtd.py
â”‚   â”‚           â”œâ”€â”€ inkspire.py
â”‚   â”‚           â”œâ”€â”€ enquiries.py
â”‚   â”‚           â”œâ”€â”€ forms.py
â”‚   â”‚           â”œâ”€â”€ s3.py          # S3 upload endpoint
â”‚   â”‚           â””â”€â”€ news.py        # News & media (NEW)
â”‚   â”œâ”€â”€ db/
â”‚   â”‚   â”œâ”€â”€ base.py                # DynamoDB client
â”‚   â”‚   â”œâ”€â”€ blog_db.py
â”‚   â”‚   â”œâ”€â”€ committee_db.py
â”‚   â”‚   â”œâ”€â”€ referees_db.py
â”‚   â”‚   â”œâ”€â”€ results_db.py
â”‚   â”‚   â”œâ”€â”€ partnerships_db.py
â”‚   â”‚   â”œâ”€â”€ vtd_db.py
â”‚   â”‚   â”œâ”€â”€ inkspire_db.py
â”‚   â”‚   â”œâ”€â”€ enquiries_db.py
â”‚   â”‚   â”œâ”€â”€ forms_db.py
â”‚   â”‚   â””â”€â”€ news_db.py             # News table (NEW)
â”‚   â”œâ”€â”€ models/                    # (Currently minimal, Pydantic used)
â”‚   â”œâ”€â”€ schemas/
â”‚   â”‚   â”œâ”€â”€ blog.py                # Request/response models
â”‚   â”‚   â”œâ”€â”€ committee.py
â”‚   â”‚   â”œâ”€â”€ referees.py
â”‚   â”‚   â”œâ”€â”€ results.py
â”‚   â”‚   â”œâ”€â”€ partnerships.py
â”‚   â”‚   â”œâ”€â”€ vtd.py
â”‚   â”‚   â”œâ”€â”€ inkspire.py
â”‚   â”‚   â”œâ”€â”€ forms.py
â”‚   â”‚   â””â”€â”€ news.py                # News schemas (NEW)
â”‚   â””â”€â”€ services/
â”‚       â”œâ”€â”€ blog_service.py        # Business logic
â”‚       â”œâ”€â”€ committee_service.py
â”‚       â”œâ”€â”€ referees_service.py
â”‚       â”œâ”€â”€ results_service.py
â”‚       â”œâ”€â”€ partnerships_service.py
â”‚       â”œâ”€â”€ vtd_service.py
â”‚       â”œâ”€â”€ inkspire_service.py
â”‚       â”œâ”€â”€ forms_service.py
â”‚       â””â”€â”€ news_service.py        # News CRUD (NEW)
â””â”€â”€ scripts/
    â”œâ”€â”€ init_districts.py
    â”œâ”€â”€ create_enquiries_table.py
    â”œâ”€â”€ create_forms_table.py
    â””â”€â”€ bulk_upload_gallery.py
```

### FastAPI Application Flow

#### 1. Entry Point (`main.py`)
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router

app = FastAPI(title="WPC Telangana API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API router
app.include_router(api_router, prefix="/api/v1")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

#### 2. Router Aggregation (`api/v1/api.py`)
```python
from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, blog, committee, referees, results,
    partnerships, vtd, inkspire, enquiries, forms, s3, news
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(blog.router, prefix="/blog", tags=["Blog"])
api_router.include_router(committee.router, prefix="/committee", tags=["Committee"])
api_router.include_router(news.router, prefix="/news", tags=["News"])
# ... etc
```

#### 3. Layered Architecture Pattern

**Example: News Module**

**Schema Layer** (`schemas/news.py`):
```python
from pydantic import BaseModel
from typing import Optional

class NewsBase(BaseModel):
    title: str
    description: Optional[str] = None
    image_url: str
    category: str = "General"
    published_date: str
    is_featured: bool = False
    status: str = "published"

class NewsCreate(NewsBase):
    pass

class NewsResponse(NewsBase):
    id: str
    slug: str
    created_at: str
    updated_at: str
```

**Database Layer** (`db/news_db.py`):
```python
import boto3
from app.core.config import settings

dynamodb = boto3.resource('dynamodb', region_name=settings.AWS_REGION)

def get_news_table():
    table_name = settings.DYNAMODB_NEWS_TABLE
    table = dynamodb.Table(table_name)
    # Auto-create if not exists
    return table
```

**Service Layer** (`services/news_service.py`):
```python
import uuid
from datetime import datetime

class NewsService:
    def __init__(self):
        self.table = get_news_table()
    
    def create_news(self, news_data: dict):
        news_id = str(uuid.uuid4())
        item = {
            'id': news_id,
            'slug': self._slugify(news_data['title']),
            'created_at': datetime.utcnow().isoformat(),
            **news_data
        }
        self.table.put_item(Item=item)
        return item
    
    def get_all_news(self):
        response = self.table.scan()
        return sorted(response['Items'], key=lambda x: x['published_date'], reverse=True)
```

**API Endpoint Layer** (`api/v1/endpoints/news.py`):
```python
from fastapi import APIRouter, Depends
from app.core.security import verify_token
from app.schemas.news import NewsCreate, NewsResponse
from app.services.news_service import news_service

router = APIRouter()

@router.get("/", response_model=List[NewsResponse])
async def list_news(published_only: bool = False):
    """Public endpoint - get all news"""
    return news_service.get_all_news()

@router.post("/", response_model=NewsResponse)
async def create_news(news: NewsCreate, current_user: dict = Depends(verify_token)):
    """Admin only - create news"""
    return news_service.create_news(news.dict())
```

---

## Database Structure

### DynamoDB Tables

All tables use **Pay-Per-Request** billing mode (no capacity planning needed).

#### Table: `rekha_blogs`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `title` | String | Blog post title |
| `slug` | String | URL-friendly slug |
| `description` | String | HTML content |
| `image` | String | S3 URL |
| `date` | String | ISO 8601 date |
| `author` | String | Author name |
| `tags` | List | Array of tags |
| `created_at` | String | Timestamp |

#### Table: `rekha_committee_members`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `name` | String | Full name |
| `designation` | String | Role/position |
| `bio` | String | Biography |
| `image_url` | String | S3 profile image |
| `email` | String | Contact email |
| `phone` | String | Contact phone |
| `social_media` | Map | FB, Instagram, LinkedIn links |
| `order` | Number | Display order |
| `created_at` | String | Timestamp |

#### Table: `rekha_referees`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `name` | String | Full name |
| `category` | String | IWF/National/State |
| `level` | String | Certification level |
| `image_url` | String | S3 photo |
| `phone` | String | Contact |
| `email` | String | Email |
| `district` | String | District name |
| `certificate_url` | String | S3 certificate PDF |
| `status` | String | Active/Inactive |
| `created_at` | String | Timestamp |

#### Table: `rekha_results`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `title` | String | Event name |
| `event_date` | String | Date of event |
| `location` | String | Venue |
| `category` | String | State/National/International |
| `result_pdf_url` | String | S3 PDF URL |
| `image_url` | String | Event photo |
| `description` | String | Event summary |
| `created_at` | String | Timestamp |

#### Table: `rekha_partnerships`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `title` | String | Partnership name |
| `description` | String | Details |
| `partner_name` | String | Organization name |
| `logo_url` | String | S3 logo |
| `type` | String | Sponsor/Venue/Equipment/Other |
| `status` | String | Active/Inactive |
| `start_date` | String | Partnership start |
| `end_date` | String | Partnership end (optional) |
| `contact_person` | String | Contact name |
| `created_at` | String | Timestamp |

#### Table: `rekha_vtd_books`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `title` | String | Book title |
| `description` | String | Book description |
| `pdf_url` | String | S3 PDF file |
| `thumbnail_url` | String | Cover image |
| `order` | Number | Display order |
| `created_at` | String | Timestamp |

#### Table: `rekha_inkspire_books`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `title` | String | Book title |
| `description` | String | Book description |
| `pdf_url` | String | S3 PDF file |
| `thumbnail_url` | String | Cover image |
| `order` | Number | Display order |
| `created_at` | String | Timestamp |

#### Table: `rekha_enquiries`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `name` | String | Contact name |
| `email` | String | Email address |
| `phone` | String | Phone number |
| `subject` | String | Inquiry subject |
| `message` | String | Message content |
| `status` | String | New/Read/Responded |
| `created_at` | String | Submission timestamp |

#### Table: `rekha_forms`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `name` | String | Applicant name |
| `email` | String | Email |
| `phone` | String | Phone |
| `form_type` | String | Registration/Membership/etc |
| `form_data` | Map | JSON form fields |
| `status` | String | Pending/Approved/Rejected |
| `created_at` | String | Submission timestamp |

#### Table: `rekha_news` (NEW)
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `title` | String | News headline |
| `slug` | String | URL slug |
| `description` | String | Brief summary |
| `image_url` | String | S3 full image |
| `thumbnail_url` | String | S3 thumbnail |
| `category` | String | Newspaper/Championship/etc |
| `published_date` | String | Publication date |
| `is_featured` | Boolean | Featured flag |
| `status` | String | published/draft |
| `created_at` | String | Created timestamp |
| `updated_at` | String | Last modified |

### DynamoDB Access Pattern

#### Connection Setup (`db/base.py`)
```python
import boto3
from app.core.config import settings

# Initialize DynamoDB resource
dynamodb = boto3.resource(
    'dynamodb',
    region_name=settings.AWS_REGION,
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
)
```

#### Query Patterns
```python
# Scan (get all items)
response = table.scan()
items = response['Items']

# Get item by ID
response = table.get_item(Key={'id': item_id})
item = response.get('Item')

# Put item (create/update)
table.put_item(Item={
    'id': str(uuid.uuid4()),
    'title': 'Sample',
    'created_at': datetime.utcnow().isoformat()
})

# Delete item
table.delete_item(Key={'id': item_id})

# Update item
table.update_item(
    Key={'id': item_id},
    UpdateExpression='SET title = :title, updated_at = :updated',
    ExpressionAttributeValues={
        ':title': new_title,
        ':updated': datetime.utcnow().isoformat()
    }
)
```

**Note:** DynamoDB is schemaless. Tables are auto-created by backend services if they don't exist. No migrations needed.

---

## Storage & Media Management

### AWS S3 Configuration

**Bucket Structure:**
```
wpc-telangana-assets/
â”œâ”€â”€ blog/                  # Blog post images
â”œâ”€â”€ committee/             # Team member photos
â”œâ”€â”€ referees/              # Referee photos & certificates
â”œâ”€â”€ results/               # Event photos & result PDFs
â”œâ”€â”€ partnerships/          # Partner logos
â”œâ”€â”€ vtd/                   # VTD book PDFs
â”œâ”€â”€ inkspire/              # Inkspire book PDFs
â”œâ”€â”€ gallery/               # Gallery photos
â””â”€â”€ news/                  # News newspaper images (NEW)
```

### Upload Flow

#### Backend S3 Endpoint (`api/v1/endpoints/s3.py`)
```python
from fastapi import APIRouter, UploadFile, File
import boto3

router = APIRouter()
s3_client = boto3.client('s3', region_name=settings.AWS_REGION)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), folder: str = "blog"):
    # Generate unique filename
    timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S')
    filename = f"{folder}/{timestamp}_{file.filename}"
    
    # Upload to S3
    s3_client.upload_fileobj(
        file.file,
        settings.S3_BUCKET_NAME,
        filename,
        ExtraArgs={'ContentType': file.content_type, 'ACL': 'public-read'}
    )
    
    # Return public URL
    url = f"https://{settings.S3_BUCKET_NAME}.s3.amazonaws.com/{filename}"
    return {"url": url, "file_url": url}
```

#### Frontend Upload Usage
```javascript
// Admin components (NewsManager, BlogManager, etc.)
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', 'news');
  
  const res = await axiosInstance.post('/s3/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return res.data.url; // Public S3 URL
};
```

### S3 Security Configuration

**Bucket Policy (Public Read Access):**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::wpc-telangana-assets/*"
    }
  ]
}
```

**CORS Configuration:**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

---

## API Flow & Authentication

### Authentication Flow

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Admin Login â”‚
â”‚   /admin    â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ POST /api/v1/auth/login
       â”‚ { username, password }
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  FastAPI Backend â”‚
â”‚   auth.py        â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ Verify credentials
       â”‚ (hardcoded in config)
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Generate JWT    â”‚
â”‚  (30 day expiry) â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ Return token
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚   Store in           â”‚
â”‚   localStorage:      â”‚
â”‚   - adminToken       â”‚
â”‚   - isAdminLoggedIn  â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ All subsequent API calls
       â”‚ include header:
       â”‚ Authorization: Bearer <token>
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Axios Interceptor   â”‚
â”‚  (axiosConfig.js)    â”‚
â”‚  Auto-injects token  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Admin Credentials Configuration

**Backend** (`app/core/config.py`):
```python
class Settings(BaseSettings):
    # Admin credentials (change in production!)
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "your_secure_password"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 43200  # 30 days
```

### Protected Endpoint Pattern

```python
from fastapi import Depends
from app.core.security import verify_token

@router.post("/news/", response_model=NewsResponse)
async def create_news(
    news: NewsCreate,
    current_user: dict = Depends(verify_token)  # Requires valid JWT
):
    return news_service.create_news(news.dict())
```

### Public vs Protected Endpoints

| Endpoint | Method | Auth Required | Purpose |
|----------|--------|---------------|---------|
| `/api/v1/auth/login` | POST | No | Admin login |
| `/api/v1/blog/` | GET | No | Public blog list |
| `/api/v1/blog/` | POST | Yes | Create blog post |
| `/api/v1/news/` | GET | No | Public news list |
| `/api/v1/news/` | POST | Yes | Create news |
| `/api/v1/committee/` | GET | No | Public team list |
| `/api/v1/committee/` | POST | Yes | Add team member |
| `/api/v1/s3/upload` | POST | Yes | Upload media |
| `/api/v1/enquiries/` | POST | No | Submit contact form |
| `/api/v1/enquiries/` | GET | Yes | View submissions |

---

## Deployment Architecture

### Production Deployment Stack

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚          Domain (example.com)              â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
               â”‚
               â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  NGINX (Port 80/443)                       â”‚
â”‚  - SSL Termination                         â”‚
â”‚  - Static file serving (React build)       â”‚
â”‚  - Reverse proxy to backend                â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
               â”‚
        â”Œâ”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”
        â”‚             â”‚
        â–¼             â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Static   â”‚   â”‚   Backend    â”‚
â”‚  React    â”‚   â”‚   FastAPI    â”‚
â”‚  Build    â”‚   â”‚   :8000      â”‚
â”‚  /build/  â”‚   â”‚              â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”˜
                       â”‚
                â”Œâ”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”
                â”‚   PM2       â”‚
                â”‚  (Process   â”‚
                â”‚   Manager)  â”‚
                â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # React static files
    location / {
        root /path/to/Powerlift/build;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API proxy
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### PM2 Process Configuration

**File:** `ecosystem.config.js`
```javascript
module.exports = {
  apps: [{
    name: 'wpc-backend',
    script: 'blog-backend/main.py',
    interpreter: 'blog-backend/.venv/bin/python',
    cwd: '/path/to/Powerlift',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      PORT: 8000,
      NODE_ENV: 'production'
    }
  }]
};
```

### Startup Commands

**Backend:**
```bash
cd blog-backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000

# Or with PM2:
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

**Frontend:**
```bash
npm install
npm run build
# Serve build/ folder via nginx or static server
```

---

## Environment Configuration

### Backend Environment Variables

**File:** `blog-backend/.env` (or OS environment)
```bash
# AWS Configuration
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
S3_BUCKET_NAME=wpc-telangana-assets

# DynamoDB Tables
DYNAMODB_BLOG_TABLE=rekha_blogs
DYNAMODB_COMMITTEE_TABLE=rekha_committee_members
DYNAMODB_REFEREES_TABLE=rekha_referees
DYNAMODB_RESULTS_TABLE=rekha_results
DYNAMODB_PARTNERSHIPS_TABLE=rekha_partnerships
DYNAMODB_VTD_BOOKS_TABLE=rekha_vtd_books
DYNAMODB_INKSPIRE_BOOKS_TABLE=rekha_inkspire_books
DYNAMODB_ENQUIRIES_TABLE=rekha_enquiries
DYNAMODB_FORMS_TABLE=rekha_forms
DYNAMODB_NEWS_TABLE=rekha_news

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

# JWT Configuration
SECRET_KEY=your-jwt-secret-key-min-32-characters
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200

# API Configuration
API_V1_PREFIX=/api/v1
CORS_ORIGINS=["http://localhost:3000","https://your-domain.com"]
```

### Frontend Environment Variables

**File:** `.env` (root of React project)
```bash
# API Backend URL
REACT_APP_API_URL=http://localhost:8000/api/v1

# Production:
# REACT_APP_API_URL=https://your-domain.com/api/v1

# Public URL (for asset paths)
PUBLIC_URL=/
```

### Configuration Loading

**Backend** (`app/core/config.py`):
```python
from pydantic import BaseSettings

class Settings(BaseSettings):
    AWS_REGION: str
    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    S3_BUCKET_NAME: str
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
```

**Frontend:**
```javascript
// Accessed via process.env
const apiUrl = process.env.REACT_APP_API_URL;
const publicUrl = process.env.PUBLIC_URL;
```

---

## Key Integration Points

### 1. Frontend â†” Backend Communication

**Pattern:**
```javascript
// All API calls use axiosInstance
import { axiosInstance } from '../config/axiosConfig';

// GET request
const news = await axiosInstance.get('/news/');

// POST with auth (token auto-injected)
const newItem = await axiosInstance.post('/news/', {
  title: 'Breaking News',
  image_url: 'https://...',
  // ...
});
```

### 2. Image Upload Flow

```
User selects file
      â†“
FormData created
      â†“
POST /api/v1/s3/upload
      â†“
Backend uploads to S3
      â†“
Return public URL
      â†“
Frontend stores URL in form
      â†“
Submit form with URL to create endpoint
      â†“
URL saved in DynamoDB
```

### 3. Admin Dashboard State Management

```
URL: /admin/dashboard?section=news
      â†“
AdminDashboard.js reads URLSearchParams
      â†“
renderContent() switch on section
      â†“
Render <NewsManager />
      â†“
NewsManager fetches GET /api/v1/news/
      â†“
Display table + CRUD actions
```

### 4. Public Page Data Loading

```javascript
// Example: News page
useEffect(() => {
  const fetchNews = async () => {
    try {
      const res = await axiosInstance.get('/news/?published_only=true');
      setNews(res.data);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    }
  };
  fetchNews();
}, []);
```

---

## Database & API Quick Reference

### Complete Endpoint List

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| **Auth** ||||
| `/api/v1/auth/login` | POST | No | Admin login |
| **Blog** ||||
| `/api/v1/blog/` | GET | No | List blogs |
| `/api/v1/blog/{id}` | GET | No | Get blog by ID |
| `/api/v1/blog/` | POST | Yes | Create blog |
| `/api/v1/blog/{id}` | PUT | Yes | Update blog |
| `/api/v1/blog/{id}` | DELETE | Yes | Delete blog |
| **Committee** ||||
| `/api/v1/committee/` | GET | No | List members |
| `/api/v1/committee/{id}` | GET | No | Get member |
| `/api/v1/committee/` | POST | Yes | Add member |
| `/api/v1/committee/{id}` | PUT | Yes | Update member |
| `/api/v1/committee/{id}` | DELETE | Yes | Delete member |
| **Referees** ||||
| `/api/v1/referees/` | GET | No | List referees |
| `/api/v1/referees/{id}` | GET | No | Get referee |
| `/api/v1/referees/` | POST | Yes | Add referee |
| `/api/v1/referees/{id}` | PUT | Yes | Update referee |
| `/api/v1/referees/{id}` | DELETE | Yes | Delete referee |
| **Results** ||||
| `/api/v1/results/` | GET | No | List results |
| `/api/v1/results/{id}` | GET | No | Get result |
| `/api/v1/results/` | POST | Yes | Add result |
| `/api/v1/results/{id}` | PUT | Yes | Update result |
| `/api/v1/results/{id}` | DELETE | Yes | Delete result |
| **Partnerships** ||||
| `/api/v1/partnerships/` | GET | No | List partnerships |
| `/api/v1/partnerships/{id}` | GET | No | Get partnership |
| `/api/v1/partnerships/` | POST | Yes | Add partnership |
| `/api/v1/partnerships/{id}` | PUT | Yes | Update partnership |
| `/api/v1/partnerships/{id}` | DELETE | Yes | Delete partnership |
| **VTD Books** ||||
| `/api/v1/vtd/` | GET | No | List VTD books |
| `/api/v1/vtd/{id}` | GET | No | Get book |
| `/api/v1/vtd/` | POST | Yes | Add book |
| `/api/v1/vtd/{id}` | PUT | Yes | Update book |
| `/api/v1/vtd/{id}` | DELETE | Yes | Delete book |
| **Inkspire Books** ||||
| `/api/v1/inkspire/` | GET | No | List Inkspire books |
| `/api/v1/inkspire/{id}` | GET | No | Get book |
| `/api/v1/inkspire/` | POST | Yes | Add book |
| `/api/v1/inkspire/{id}` | PUT | Yes | Update book |
| `/api/v1/inkspire/{id}` | DELETE | Yes | Delete book |
| **Forms & Enquiries** ||||
| `/api/v1/enquiries/` | POST | No | Submit contact form |
| `/api/v1/enquiries/` | GET | Yes | List enquiries |
| `/api/v1/forms/` | POST | No | Submit registration |
| `/api/v1/forms/` | GET | Yes | List form submissions |
| **News & Media** ||||
| `/api/v1/news/` | GET | No | List news (public) |
| `/api/v1/news/{slug}` | GET | No | Get news by slug |
| `/api/v1/news/` | POST | Yes | Create news |
| `/api/v1/news/{id}` | PUT | Yes | Update news |
| `/api/v1/news/{id}` | DELETE | Yes | Delete news |
| **S3 Upload** ||||
| `/api/v1/s3/upload` | POST | Yes | Upload file to S3 |

---

## Development Setup Instructions

### Prerequisites
- **Node.js** 16+ and npm
- **Python** 3.9+
- **AWS Account** with S3 and DynamoDB access
- **Git**

### Quick Start

**1. Clone Repository**
```bash
git clone <repository-url>
cd Powerlift
```

**2. Backend Setup**
```bash
cd blog-backend

# Create virtual environment
python -m venv .venv

# Activate (Windows)
.venv\Scripts\activate

# Activate (Linux/Mac)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your AWS credentials

# Run backend
uvicorn main:app --reload --port 8000
```

**3. Frontend Setup**
```bash
# In project root
npm install

# Configure environment
cp .env.example .env
# Edit .env with API URL

# Run development server
npm start
```

**4. Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Admin Panel: http://localhost:3000/admin

---

## Security Considerations

### Current Implementation
- JWT tokens with 30-day expiry
- Admin credentials in environment variables
- S3 public read access for media
- CORS enabled for all origins (development)

### Production Recommendations
1. **Change admin credentials** in production `.env`
2. **Update SECRET_KEY** to strong random value (32+ characters)
3. **Configure CORS** to specific domain only
4. **Enable HTTPS** with SSL certificate
5. **Add rate limiting** to API endpoints
6. **Implement logging** and monitoring
7. **Regular token rotation** policy
8. **S3 bucket versioning** for backup
9. **DynamoDB point-in-time recovery**
10. **Regular security audits**

---

## Monitoring & Maintenance

### Log Files
- **Backend logs:** PM2 logs (`pm2 logs wpc-backend`)
- **Frontend build errors:** Browser console
- **Nginx access/error logs:** `/var/log/nginx/`

### Health Checks
```bash
# Backend health
curl http://localhost:8000/docs

# DynamoDB connection
aws dynamodb list-tables --region ap-south-1

# S3 bucket access
aws s3 ls s3://wpc-telangana-assets/
```

### Backup Strategy
- **DynamoDB:** Enable point-in-time recovery (PITR)
- **S3:** Enable versioning and lifecycle policies
- **Code:** Git version control

---

## Support & Contacts

### Development Team
- **Original Developer:** [Your contact]
- **Repository:** [Git URL]

### AWS Resources
- **Region:** ap-south-1 (Mumbai)
- **S3 Bucket:** wpc-telangana-assets
- **DynamoDB Tables:** rekha_* (10 tables)

### Useful Commands
```bash
# Start backend
cd blog-backend && uvicorn main:app --reload

# Build frontend
npm run build

# PM2 management
pm2 start ecosystem.config.js
pm2 stop wpc-backend
pm2 restart wpc-backend
pm2 logs wpc-backend
```

---

**Document Version:** 1.0  
**Last Updated:** July 2026  
**Status:** Production Ready


---

# PART 5: ARCHITECTURE DIAGRAMS

# WPC Telangana - Architecture & Data Flow Diagrams

**Visual Reference for Technical Team**

---

## 1. System Architecture Overview

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                           END USERS / VISITORS                          â”‚
â”‚                     (Desktop, Tablet, Mobile Browsers)                  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                 â”‚
                                 â”‚ HTTPS
                                 â”‚
                â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                â”‚         NGINX Web Server          â”‚
                â”‚      (Reverse Proxy + SSL)        â”‚
                â”‚         Port 80/443               â”‚
                â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                             â”‚          â”‚
                    /        â”‚          â”‚      /api/v1/*
                   static    â”‚          â”‚      requests
                   files     â”‚          â”‚
                             â”‚          â”‚
                â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”   â”Œâ”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                â”‚   FRONTEND    â”‚   â”‚     BACKEND        â”‚
                â”‚               â”‚   â”‚                    â”‚
                â”‚  React SPA    â”‚   â”‚  FastAPI (Python)  â”‚
                â”‚  Port 3000    â”‚   â”‚  Port 8000         â”‚
                â”‚               â”‚   â”‚                    â”‚
                â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚   â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
                â”‚ â”‚Components â”‚ â”‚   â”‚ â”‚   API Routes   â”‚ â”‚
                â”‚ â”‚  - Header â”‚ â”‚   â”‚ â”‚   /auth        â”‚ â”‚
                â”‚ â”‚  - News   â”‚ â”‚   â”‚ â”‚   /blog        â”‚ â”‚
                â”‚ â”‚  - Galleryâ”‚ â”‚   â”‚ â”‚   /news        â”‚ â”‚
                â”‚ â”‚  - Admin  â”‚ â”‚   â”‚ â”‚   /committee   â”‚ â”‚
                â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚   â”‚ â”‚   /s3          â”‚ â”‚
                â”‚               â”‚   â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
                â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚   â”‚                    â”‚
                â”‚ â”‚ Axios API â”‚ â”‚   â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
                â”‚ â”‚  Client   â”‚â—„â”€â”€â”€â”€â”€â”¼â”€â”¤   Services     â”‚ â”‚
                â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚   â”‚ â”‚   Layer        â”‚ â”‚
                â”‚               â”‚   â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
                â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                           â”‚
                                           â”‚ AWS SDK
                                           â”‚ (Boto3)
                                           â”‚
                      â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                      â”‚                                         â”‚
                      â”‚                                         â”‚
                 â”Œâ”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”                    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”
                 â”‚  AWS DynamoDB â”‚                    â”‚    AWS S3     â”‚
                 â”‚   (Database)  â”‚                    â”‚   (Storage)   â”‚
                 â”‚               â”‚                    â”‚               â”‚
                 â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚                    â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
                 â”‚ â”‚rekha_news â”‚ â”‚                    â”‚ â”‚   /news   â”‚ â”‚
                 â”‚ â”‚rekha_blogsâ”‚ â”‚                    â”‚ â”‚   /blog   â”‚ â”‚
                 â”‚ â”‚rekha_...  â”‚ â”‚                    â”‚ â”‚   /galleryâ”‚ â”‚
                 â”‚ â”‚(10 tables)â”‚ â”‚                    â”‚ â”‚   /vtd    â”‚ â”‚
                 â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚                    â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
                 â”‚               â”‚                    â”‚               â”‚
                 â”‚ Pay-Per-Requestâ”‚                    â”‚ Public Read  â”‚
                 â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜                    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## 2. Request Flow - Public User Journey

### Scenario: User Visits News Page

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  BROWSER â”‚
â”‚  User    â”‚
â””â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”˜
     â”‚
     â”‚ 1. Navigate to /news
     â”‚
     â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  React Router   â”‚
â”‚  Loads NewsPage â”‚
â””â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
     â”‚
     â”‚ 2. useEffect() triggered
     â”‚
     â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Axios HTTP Client       â”‚
â”‚  GET /api/v1/news/       â”‚
â”‚  ?published_only=true    â”‚
â””â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
     â”‚
     â”‚ 3. HTTP Request
     â”‚
     â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  FastAPI Backend            â”‚
â”‚  /api/v1/endpoints/news.py  â”‚
â””â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
     â”‚
     â”‚ 4. Route handler calls service
     â”‚
     â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  NewsService             â”‚
â”‚  get_all_news()          â”‚
â””â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
     â”‚
     â”‚ 5. DynamoDB query
     â”‚
     â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  AWS DynamoDB            â”‚
â”‚  rekha_news table        â”‚
â”‚  SCAN operation          â”‚
â””â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
     â”‚
     â”‚ 6. Return items
     â”‚
     â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  NewsService             â”‚
â”‚  - Filter published      â”‚
â”‚  - Sort by date          â”‚
â”‚  - Separate featured     â”‚
â””â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
     â”‚
     â”‚ 7. JSON response
     â”‚
     â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  React Component         â”‚
â”‚  NewsMain.js             â”‚
â”‚  - setNews(data)         â”‚
â”‚  - Render grid           â”‚
â”‚  - Load S3 images        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## 3. Request Flow - Admin CRUD Operation

### Scenario: Admin Creates News Item with Image

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ ADMIN USER   â”‚
â”‚ at /admin    â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ 1. Login with credentials
       â”‚
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  POST /auth/login    â”‚
â”‚  {user, pass}        â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ 2. Verify credentials
       â”‚
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  JWT Token Generated â”‚
â”‚  30-day expiry       â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ 3. Store in localStorage
       â”‚    - adminToken
       â”‚    - isAdminLoggedIn
       â”‚
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Navigate to             â”‚
â”‚  /admin/dashboard        â”‚
â”‚  ?section=news           â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ 4. NewsManager component loads
       â”‚
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  User clicks "Add News"  â”‚
â”‚  Opens modal form        â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ 5. Selects image file
       â”‚
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  File Upload Handler           â”‚
â”‚  - Create FormData             â”‚
â”‚  - Append file + folder="news" â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ 6. POST /api/v1/s3/upload
       â”‚    (with JWT in header)
       â”‚
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Backend S3 Endpoint     â”‚
â”‚  - Verify JWT token      â”‚
â”‚  - Generate filename     â”‚
â”‚  - Upload to S3          â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ 7. S3 Upload
       â”‚
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  AWS S3 Bucket           â”‚
â”‚  /news/20260701_...jpg   â”‚
â”‚  ACL: public-read        â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ 8. Return public URL
       â”‚    https://bucket.s3.../news/...jpg
       â”‚
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Form updates            â”‚
â”‚  image_url field         â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ 9. User fills title, category, etc.
       â”‚    Clicks "Add News"
       â”‚
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  POST /api/v1/news/      â”‚
â”‚  {title, image_url, ...} â”‚
â”‚  (with JWT in header)    â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ 10. Verify JWT
       â”‚
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  NewsService             â”‚
â”‚  create_news()           â”‚
â”‚  - Generate ID (UUID)    â”‚
â”‚  - Generate slug         â”‚
â”‚  - Add timestamps        â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ 11. DynamoDB put_item
       â”‚
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  AWS DynamoDB            â”‚
â”‚  rekha_news table        â”‚
â”‚  New item created        â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ 12. Success response
       â”‚
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  NewsManager             â”‚
â”‚  - Close modal           â”‚
â”‚  - Refresh table         â”‚
â”‚  - Show new item         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## 4. Authentication Flow Diagram

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                    AUTHENTICATION SYSTEM                     â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

LOGIN FLOW:
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  Browser                  Backend                   Storage
  â”€â”€â”€â”€â”€â”€â”€                  â”€â”€â”€â”€â”€â”€â”€                   â”€â”€â”€â”€â”€â”€â”€
     â”‚                        â”‚                         â”‚
     â”‚ POST /auth/login       â”‚                         â”‚
     â”‚ {username, password}   â”‚                         â”‚
     â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€>â”‚                         â”‚
     â”‚                        â”‚                         â”‚
     â”‚                        â”‚ Verify against          â”‚
     â”‚                        â”‚ config.ADMIN_USERNAME   â”‚
     â”‚                        â”‚ config.ADMIN_PASSWORD   â”‚
     â”‚                        â”‚                         â”‚
     â”‚                        â”‚ Generate JWT            â”‚
     â”‚                        â”‚ - SECRET_KEY            â”‚
     â”‚                        â”‚ - 30 day expiry         â”‚
     â”‚                        â”‚                         â”‚
     â”‚   {access_token: ...}  â”‚                         â”‚
     â”‚<â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤                         â”‚
     â”‚                        â”‚                         â”‚
     â”‚ localStorage.setItem   â”‚                         â”‚
     â”‚ ('adminToken', token)  â”‚                         â”‚
     â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€>â”‚
     â”‚                        â”‚                         â”‚
     

PROTECTED REQUEST FLOW:
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  Browser                  Backend                  Database
  â”€â”€â”€â”€â”€â”€â”€                  â”€â”€â”€â”€â”€â”€â”€                  â”€â”€â”€â”€â”€â”€â”€â”€
     â”‚                        â”‚                         â”‚
     â”‚ GET /news/             â”‚                         â”‚
     â”‚ Header:                â”‚                         â”‚
     â”‚ Authorization:         â”‚                         â”‚
     â”‚  Bearer <token>        â”‚                         â”‚
     â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€>â”‚                         â”‚
     â”‚                        â”‚                         â”‚
     â”‚                        â”‚ Axios interceptor       â”‚
     â”‚                        â”‚ (auto-added token)      â”‚
     â”‚                        â”‚                         â”‚
     â”‚                        â”‚ verify_token()          â”‚
     â”‚                        â”‚ dependency              â”‚
     â”‚                        â”‚ - Decode JWT            â”‚
     â”‚                        â”‚ - Verify signature      â”‚
     â”‚                        â”‚ - Check expiry          â”‚
     â”‚                        â”‚                         â”‚
     â”‚                        â”‚ [Valid âœ“]               â”‚
     â”‚                        â”‚                         â”‚
     â”‚                        â”‚ Proceed to handler      â”‚
     â”‚                        â”‚                         â”‚
     â”‚                        â”‚ DynamoDB query          â”‚
     â”‚                        â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€>â”‚
     â”‚                        â”‚                         â”‚
     â”‚                        â”‚      Items []           â”‚
     â”‚                        â”‚<â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
     â”‚                        â”‚                         â”‚
     â”‚     JSON response      â”‚                         â”‚
     â”‚<â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤                         â”‚
     â”‚                        â”‚                         â”‚


TOKEN EXPIRY FLOW:
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  Browser                  Backend
  â”€â”€â”€â”€â”€â”€â”€                  â”€â”€â”€â”€â”€â”€â”€
     â”‚                        â”‚
     â”‚ API request            â”‚
     â”‚ with expired token     â”‚
     â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€>â”‚
     â”‚                        â”‚
     â”‚                        â”‚ verify_token()
     â”‚                        â”‚ â†’ Token expired!
     â”‚                        â”‚
     â”‚   401 Unauthorized     â”‚
     â”‚<â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
     â”‚                        â”‚
     â”‚ Axios interceptor      â”‚
     â”‚ detects 401            â”‚
     â”‚                        â”‚
     â”‚ Clear localStorage:    â”‚
     â”‚ - adminToken           â”‚
     â”‚ - isAdminLoggedIn      â”‚
     â”‚                        â”‚
     â”‚ Redirect to            â”‚
     â”‚ /admin/login           â”‚
     â”‚                        â”‚
```

---

## 5. Database Schema Relationships

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                      DYNAMODB TABLES                           â”‚
â”‚                    (NoSQL - No Relations)                      â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

Each table is independent. Relationships are handled in application code.

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚   rekha_news        â”‚  â† NEW TABLE
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ id (PK)      String â”‚  UUID
â”‚ slug         String â”‚  URL-friendly
â”‚ title        String â”‚
â”‚ description  String â”‚
â”‚ image_url    String â”‚  â†’ S3 URL
â”‚ thumbnail_url Stringâ”‚  â†’ S3 URL
â”‚ category     String â”‚  Newspaper/Championship/etc
â”‚ published_date Stringâ”‚ ISO 8601
â”‚ is_featured  Booleanâ”‚
â”‚ status       String â”‚  published/draft
â”‚ created_at   String â”‚
â”‚ updated_at   String â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚   rekha_blogs       â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ id (PK)      String â”‚
â”‚ title        String â”‚
â”‚ slug         String â”‚
â”‚ description  String â”‚  HTML content
â”‚ image        String â”‚  â†’ S3 URL
â”‚ date         String â”‚
â”‚ author       String â”‚
â”‚ tags         List   â”‚  [tag1, tag2]
â”‚ created_at   String â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ rekha_committee_    â”‚
â”‚    members          â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ id (PK)      String â”‚
â”‚ name         String â”‚
â”‚ designation  String â”‚
â”‚ bio          String â”‚
â”‚ image_url    String â”‚  â†’ S3 URL
â”‚ email        String â”‚
â”‚ phone        String â”‚
â”‚ social_media Map    â”‚  {fb, ig, linkedin}
â”‚ order        Number â”‚
â”‚ created_at   String â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  rekha_referees     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ id (PK)      String â”‚
â”‚ name         String â”‚
â”‚ category     String â”‚  IWF/National/State
â”‚ level        String â”‚
â”‚ image_url    String â”‚  â†’ S3 URL
â”‚ phone        String â”‚
â”‚ email        String â”‚
â”‚ district     String â”‚  â†’ Logical link
â”‚ certificate_url Stringâ”‚ â†’ S3 PDF
â”‚ status       String â”‚
â”‚ created_at   String â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  rekha_results      â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ id (PK)      String â”‚
â”‚ title        String â”‚
â”‚ event_date   String â”‚
â”‚ location     String â”‚
â”‚ category     String â”‚
â”‚ result_pdf_url Stringâ”‚ â†’ S3 PDF
â”‚ image_url    String â”‚  â†’ S3 URL
â”‚ description  String â”‚
â”‚ created_at   String â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ rekha_partnerships  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ id (PK)      String â”‚
â”‚ title        String â”‚
â”‚ description  String â”‚
â”‚ partner_name String â”‚
â”‚ logo_url     String â”‚  â†’ S3 URL
â”‚ type         String â”‚
â”‚ status       String â”‚
â”‚ start_date   String â”‚
â”‚ end_date     String â”‚
â”‚ contact_person Stringâ”‚
â”‚ created_at   String â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  rekha_vtd_books    â”‚
â”‚  rekha_inkspire_    â”‚
â”‚     books           â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ id (PK)      String â”‚
â”‚ title        String â”‚
â”‚ description  String â”‚
â”‚ pdf_url      String â”‚  â†’ S3 PDF
â”‚ thumbnail_url Stringâ”‚  â†’ S3 URL
â”‚ order        Number â”‚
â”‚ created_at   String â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  rekha_enquiries    â”‚
â”‚  rekha_forms        â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ id (PK)      String â”‚
â”‚ name         String â”‚
â”‚ email        String â”‚
â”‚ phone        String â”‚
â”‚ message/     String â”‚
â”‚  form_data   Map    â”‚
â”‚ status       String â”‚
â”‚ created_at   String â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## 6. S3 Storage Structure

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚              AWS S3 Bucket Structure                     â”‚
â”‚          Bucket: wpc-telangana-assets                    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

s3://wpc-telangana-assets/
â”‚
â”œâ”€â”€ blog/
â”‚   â”œâ”€â”€ 20260615_123456_image1.jpg
â”‚   â”œâ”€â”€ 20260620_094521_image2.png
â”‚   â””â”€â”€ ...
â”‚
â”œâ”€â”€ news/                          â† NEW FOLDER
â”‚   â”œâ”€â”€ 20260701_103045_newspaper1.jpg
â”‚   â”œâ”€â”€ 20260701_114522_championship.jpg
â”‚   â””â”€â”€ ...
â”‚
â”œâ”€â”€ committee/
â”‚   â”œâ”€â”€ 20260510_president.jpg
â”‚   â”œâ”€â”€ 20260510_secretary.jpg
â”‚   â””â”€â”€ ...
â”‚
â”œâ”€â”€ referees/
â”‚   â”œâ”€â”€ photos/
â”‚   â”‚   â”œâ”€â”€ 20260505_referee1.jpg
â”‚   â”‚   â””â”€â”€ ...
â”‚   â””â”€â”€ certificates/
â”‚       â”œâ”€â”€ 20260505_cert1.pdf
â”‚       â””â”€â”€ ...
â”‚
â”œâ”€â”€ results/
â”‚   â”œâ”€â”€ pdfs/
â”‚   â”‚   â”œâ”€â”€ 20260401_state_championship.pdf
â”‚   â”‚   â””â”€â”€ ...
â”‚   â””â”€â”€ photos/
â”‚       â”œâ”€â”€ 20260401_event_photo.jpg
â”‚       â””â”€â”€ ...
â”‚
â”œâ”€â”€ partnerships/
â”‚   â”œâ”€â”€ 20260301_partner_logo1.png
â”‚   â”œâ”€â”€ 20260315_partner_logo2.svg
â”‚   â””â”€â”€ ...
â”‚
â”œâ”€â”€ vtd/
â”‚   â”œâ”€â”€ 20260201_vtd_book1.pdf
â”‚   â”œâ”€â”€ 20260201_vtd_thumbnail1.jpg
â”‚   â””â”€â”€ ...
â”‚
â”œâ”€â”€ inkspire/
â”‚   â”œâ”€â”€ 20260220_inkspire_book1.pdf
â”‚   â”œâ”€â”€ 20260220_inkspire_thumbnail1.jpg
â”‚   â””â”€â”€ ...
â”‚
â””â”€â”€ gallery/
    â”œâ”€â”€ 20260101_gallery_image1.jpg
    â”œâ”€â”€ 20260115_gallery_image2.jpg
    â””â”€â”€ ...


FILE NAMING CONVENTION:
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Format: {folder}/{YYYYMMDD}_{HHMMSS}_{original_filename}

Example:
  news/20260701_103045_telangana_lifters_win.jpg
  
  â”œâ”€ Folder: news
  â”œâ”€ Date: 2026-07-01
  â”œâ”€ Time: 10:30:45
  â””â”€ Original: telangana_lifters_win.jpg


ACCESS PATTERN:
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Public URL:
https://wpc-telangana-assets.s3.ap-south-1.amazonaws.com/{path}

Example:
https://wpc-telangana-assets.s3.ap-south-1.amazonaws.com/news/20260701_103045_telangana_lifters_win.jpg
```

---

## 7. Admin Dashboard Navigation Flow

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                    Admin Dashboard                          â”‚
â”‚              /admin/dashboard?section={name}                â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

           â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
           â”‚    AdminDashboard.js         â”‚
           â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
           â”‚  â”‚  URLSearchParams       â”‚  â”‚
           â”‚  â”‚  reads ?section=       â”‚  â”‚
           â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
           â”‚              â”‚                â”‚
           â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
           â”‚  â”‚   MENU_ITEMS Array     â”‚  â”‚
           â”‚  â”‚  [                     â”‚  â”‚
           â”‚  â”‚   {id:'overview',...}  â”‚  â”‚
           â”‚  â”‚   {id:'blog',...}      â”‚  â”‚
           â”‚  â”‚   {id:'news',...} â†NEW â”‚  â”‚
           â”‚  â”‚   {id:'committee',...} â”‚  â”‚
           â”‚  â”‚   ...                  â”‚  â”‚
           â”‚  â”‚  ]                     â”‚  â”‚
           â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
           â”‚              â”‚                â”‚
           â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
           â”‚  â”‚  renderContent()       â”‚  â”‚
           â”‚  â”‚  switch(section) {     â”‚  â”‚
           â”‚  â”‚    case 'news':        â”‚  â”‚
           â”‚  â”‚      return            â”‚  â”‚
           â”‚  â”‚       <NewsManager />  â”‚  â”‚
           â”‚  â”‚  }                     â”‚  â”‚
           â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
           â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                          â”‚
           â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
           â”‚       NewsManager.js           â”‚
           â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
           â”‚  â”‚  Stats Grid              â”‚  â”‚
           â”‚  â”‚  Total | Published | ... â”‚  â”‚
           â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
           â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
           â”‚  â”‚  Filters & Search        â”‚  â”‚
           â”‚  â”‚  Status | Search box     â”‚  â”‚
           â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
           â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
           â”‚  â”‚  Data Table              â”‚  â”‚
           â”‚  â”‚  [Edit][Delete][Publish] â”‚  â”‚
           â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
           â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
           â”‚  â”‚  Modal Form (if open)    â”‚  â”‚
           â”‚  â”‚  - Image upload          â”‚  â”‚
           â”‚  â”‚  - Title, category, etc  â”‚  â”‚
           â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
           â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜


SECTION ROUTING:
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

URL                               Component Rendered
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
/admin/dashboard                  â†’ OverviewSection
/admin/dashboard?section=blog     â†’ BlogManager
/admin/dashboard?section=news     â†’ NewsManager â†NEW
/admin/dashboard?section=committeeâ†’ TeamManager
/admin/dashboard?section=referees â†’ RefereesManager
/admin/dashboard?section=results  â†’ ResultsManager
/admin/dashboard?section=partnerships â†’ PartnershipsManager
/admin/dashboard?section=vtd      â†’ VtdBooksManager
/admin/dashboard?section=inkspire â†’ InkspireBooksManager
/admin/dashboard?section=forms    â†’ FormsManager
```

---

## 8. Error Handling & Validation Flow

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚              ERROR HANDLING HIERARCHY                    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

FRONTEND (React):
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

User Action
    â”‚
    â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Form Validation    â”‚  â† Basic checks
â”‚ - Required fields  â”‚
â”‚ - Email format     â”‚
â”‚ - File size        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
         â”‚ [Pass]
         â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ API Call           â”‚
â”‚ try {              â”‚
â”‚   await axios...   â”‚
â”‚ } catch (err) {    â”‚
â”‚   // Handle        â”‚
â”‚ }                  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
         â”‚
         â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Axios Interceptor  â”‚  â† Response interceptor
â”‚ - Detect 401       â”‚
â”‚ - Clear tokens     â”‚
â”‚ - Redirect login   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
         â”‚
         â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Component State    â”‚
â”‚ - Show error msg   â”‚
â”‚ - Reset form       â”‚
â”‚ - User feedback    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜


BACKEND (FastAPI):
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

Request Received
    â”‚
    â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ CORS Middleware    â”‚  â† Origin check
â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
         â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Route Handler      â”‚
â”‚ @router.post("/")  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
         â”‚
         â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Pydantic           â”‚  â† Schema validation
â”‚ Validation         â”‚    - Type checking
â”‚ (Schema model)     â”‚    - Required fields
â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
         â”‚ [Validation Error]
         â”‚ â†’ 422 Unprocessable Entity
         â”‚
         â”‚ [Pass]
         â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Auth Dependency    â”‚  â† JWT verification
â”‚ verify_token()     â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
         â”‚ [Invalid Token]
         â”‚ â†’ 401 Unauthorized
         â”‚
         â”‚ [Valid]
         â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Service Layer      â”‚  â† Business logic
â”‚ - DynamoDB ops     â”‚
â”‚ - S3 operations    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
         â”‚ [Exception]
         â”‚ â†’ try/except
         â”‚ â†’ 500 Internal Error
         â”‚
         â”‚ [Success]
         â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ JSON Response      â”‚
â”‚ 200 OK             â”‚
â”‚ {data: ...}        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## 9. Deployment Workflow

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                 DEPLOYMENT PROCESS                       â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

DEVELOPMENT â†’ STAGING â†’ PRODUCTION


STEP 1: CODE PREPARATION
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Git Repo    â”‚
â”‚  (Local)     â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”‚ git add .
       â”‚ git commit -m "..."
       â”‚ git push origin main
       â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Remote Repo â”‚
â”‚  (GitHub)    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜


STEP 2: BACKEND DEPLOYMENT
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

Server (SSH)
    â”‚
    â”œâ”€ Pull latest code
    â”‚  git pull origin main
    â”‚
    â”œâ”€ Activate venv
    â”‚  source blog-backend/.venv/bin/activate
    â”‚
    â”œâ”€ Install dependencies
    â”‚  pip install -r requirements.txt
    â”‚
    â”œâ”€ Update .env (if needed)
    â”‚
    â””â”€ Restart PM2
       pm2 restart wpc-backend
       
       â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
       â”‚ Uvicorn     â”‚
       â”‚ (ASGI)      â”‚
       â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”˜
              â”‚
              â–¼
       â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
       â”‚ Port 8000   â”‚
       â”‚ Backend API â”‚
       â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜


STEP 3: FRONTEND DEPLOYMENT
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

Local Machine
    â”‚
    â”œâ”€ Update .env.production
    â”‚  REACT_APP_API_URL=https://domain.com/api/v1
    â”‚
    â”œâ”€ Build production
    â”‚  npm run build
    â”‚
    â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
    â”‚  â”‚ /build/     â”‚  â† Optimized static files
    â”‚  â”‚ - index.htmlâ”‚
    â”‚  â”‚ - static/   â”‚
    â”‚  â”‚   - js/     â”‚
    â”‚  â”‚   - css/    â”‚
    â”‚  â”‚   - media/  â”‚
    â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
    â”‚
    â””â”€ Upload to server
       scp -r build/* user@server:/var/www/html/
       
       â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
       â”‚ Nginx       â”‚
       â”‚ Serves      â”‚
       â”‚ /build/     â”‚
       â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜


STEP 4: VERIFICATION
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Health Check â”‚
â””â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”˜
       â”‚
       â”œâ”€ Backend: https://domain.com/api/v1/docs
       â”‚            (FastAPI auto-docs)
       â”‚
       â”œâ”€ Frontend: https://domain.com/
       â”‚             (Homepage loads)
       â”‚
       â”œâ”€ Admin: https://domain.com/admin
       â”‚          (Login works)
       â”‚
       â””â”€ API: Test CRUD operations
               (Create, read, update, delete)


ROLLBACK PROCEDURE (if issues):
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

