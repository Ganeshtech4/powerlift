# 📚 Technical Handover Documentation - WPC Telangana

**Prepared for Client's New Technical Team**  
**Date:** July 2026  
**Project:** WPC Telangana Federation Website

---

## 📖 Documentation Overview

This handover package contains comprehensive technical documentation to help your new development team understand and maintain the WPC Telangana website.

### 📋 Document Index

1. **[SETUP.md](./SETUP.md)** ⚡
   - **Start here!** Fast 5-minute setup
   - Essential commands and common tasks
   - Troubleshooting tips
   - Perfect for: Getting up and running quickly

2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** 📖
   - Complete technical specifications
   - Detailed architecture explanation
   - All database schemas and API endpoints
   - Security and deployment guidelines
   - Perfect for: In-depth understanding

3. **[DIAGRAMS.md](./DIAGRAMS.md)** 🎨
   - Visual system architecture
   - Data flow diagrams
   - Request/response patterns
   - Authentication flows
   - Perfect for: Visual learners

---

## 🎯 What This System Does

**WPC Telangana** is a full-stack web application for managing a powerlifting federation with:

✅ Public website (news, events, gallery, results, team info)  
✅ Admin dashboard (content management)  
✅ News & media management (newspaper coverage, announcements)  
✅ Championship results tracking  
✅ Referee and team member management  
✅ Interactive book readers (VTD & Inkspire)  
✅ Registration forms and enquiry system  
✅ WhatsApp integration for direct contact

---

## 🏗️ System Architecture (At a Glance)

```
┌──────────────┐
│   BROWSER    │
│   (Users)    │
└──────┬───────┘
       │
       ├─────────────────────┐
       │                     │
       ▼                     ▼
┌─────────────┐     ┌──────────────┐
│  FRONTEND   │────▶│   BACKEND    │
│  React SPA  │     │   FastAPI    │
│  Port 3000  │     │   Port 8000  │
└─────────────┘     └──────┬───────┘
                           │
                    ┌──────┴──────┐
                    │             │
                    ▼             ▼
              ┌──────────┐  ┌─────────┐
              │ DynamoDB │  │  AWS S3 │
              │ Database │  │ Storage │
              └──────────┘  └─────────┘
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

## 🚀 Quick Start (5 Minutes)

### Prerequisites
```bash
✓ Node.js 16+
✓ Python 3.9+
✓ AWS credentials
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

## 📊 Database Tables (DynamoDB)

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

## 🔐 Authentication System

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

## 📡 API Endpoints Overview

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

## 🗂️ Project Structure

```
Powerlift/
│
├── src/                          # FRONTEND (React)
│   ├── pages/                    # Page components
│   │   ├── news/                 # News page (NEW)
│   │   ├── admin/                # Admin dashboard
│   │   │   └── sections/         # Admin manager components
│   │   ├── home/
│   │   ├── gallery/
│   │   └── ...
│   ├── components/
│   │   ├── Layout/               # Header, Footer
│   │   └── Common/               # Reusable components
│   ├── config/
│   │   └── axiosConfig.js        # API client setup
│   └── assets/
│       └── css/eventflow.css     # Main stylesheet
│
├── blog-backend/                 # BACKEND (FastAPI)
│   ├── main.py                   # App entry point
│   ├── app/
│   │   ├── api/v1/endpoints/     # API routes
│   │   │   ├── news.py           # News CRUD (NEW)
│   │   │   ├── blog.py
│   │   │   ├── auth.py
│   │   │   └── ...
│   │   ├── services/             # Business logic
│   │   ├── schemas/              # Pydantic models
│   │   ├── db/                   # DynamoDB connections
│   │   └── core/
│   │       ├── config.py         # Environment settings
│   │       └── security.py       # JWT utilities
│   └── requirements.txt
│
├── public/                       # Static assets
│   └── images/
│
├── SETUP.md                      # ⚡ Start here!
├── ARCHITECTURE.md               # 📖 Full specs
├── DIAGRAMS.md                   # 🎨 Visual diagrams
└── HANDOVER.md                   # 📋 This file
```

---

## 🆕 Recent Updates (Latest Session - July 2026)

### New Features Added

1. **News & Media Module** 📰
   - Public news page: `/news`
   - Admin management: `/admin/dashboard?section=news`
   - Features: Image lightbox, featured items, category filters
   - Database: New `rekha_news` DynamoDB table
   - API: Complete CRUD endpoints

2. **WhatsApp Integration** 💬
   - Floating WhatsApp button on all pages
   - Direct chat to: +91 7330778111

3. **UI Enhancements** 🎨
   - Navbar background with gradient stripes
   - Improved mobile navigation
   - CSS fixes for global color issues

### Files Created/Modified
See detailed list in `SETUP.md` section "Recent Updates"

---

## 🛠️ Common Development Tasks

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

## 🐛 Troubleshooting

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

## 🚀 Production Deployment

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

## 📞 Support & Resources

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

## 📚 Where to Find Information

| Need to... | Read this document |
|------------|-------------------|
| Get started quickly | `SETUP.md` |
| Understand system architecture | `DIAGRAMS.md` |
| See API endpoints | `ARCHITECTURE.md` |
| Add new features | All three documents |
| Troubleshoot issues | `SETUP.md` |
| Deploy to production | `ARCHITECTURE.md` |

---

## ✅ Handover Checklist

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

## 🎓 Learning Path for New Team

### Day 1: Setup & Familiarization
1. Read `SETUP.md` (30 min)
2. Set up development environment (1 hour)
3. Explore admin dashboard (30 min)
4. Review `DIAGRAMS.md` (30 min)

### Day 2: Deep Dive
1. Read `ARCHITECTURE.md` (2 hours)
2. Trace a request from frontend → backend → database
3. Make a small change (add a field to news)
4. Test the full CRUD flow

### Day 3: Practice
1. Add a new admin section (follow existing patterns)
2. Create a new API endpoint
3. Deploy to staging environment

---

## 📝 Notes for Development Team

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

## 🤝 Questions?

If you have questions or need clarification:

1. **Check the docs:** Most questions answered in the three documentation files
2. **Review the code:** Well-structured and commented
3. **Test the API:** Interactive docs at `/docs` endpoint
4. **Contact original developer:** [Your contact information]

---

**Welcome to the WPC Telangana project!** 🎉

The system is production-ready and well-documented. Start with the `SETUP.md` and you'll be productive within the first day.

**Happy coding!** 🚀

---

**Document Version:** 1.0  
**Last Updated:** July 2026  
**Status:** Ready for Handover ✅
