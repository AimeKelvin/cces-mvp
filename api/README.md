# 🏛️ Citizen Complaint Engagement System – MVP

An AI-powered backend system for managing public complaints and routing them to the correct government departments.

## 🔧 Tech Stack
- Node.js + Express
- MongoDB Atlas
- JWT (for government user auth)
- Google Gemini AI (for complaint classification)

---

## 📌 Features

### Citizens
- Submit complaints (no login needed)
- Receive a `ticketId` for tracking
- Track complaints via `/api/track/:ticketId`

### Government Officials
- Login via `/api/auth/login`
- JWT-protected dashboard:
  - View assigned complaints
  - Respond to them

### AI Complaint Routing
- Gemini AI classifies complaints into categories:
  - Water & Sanitation
  - Electricity
  - Waste Management
  - Roads & Infrastructure
  - Security
  - General
- Automatically assigns to correct department official

---

## 📂 API Endpoints

### Citizen
```http
POST /api/complaints
BODY: { "title": "...", "description": "..." }

GET /api/track/:ticketId
