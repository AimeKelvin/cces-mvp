# 📣 Citizen Engagement System Backend (MVP)

A full-stack-ready backend API that enables citizens to submit public complaints, automatically routes them to relevant government agencies using keyword-based classifier algorithm, and allows government officials to register, manage, and respond to them.

## 🚀 Features

- Submit complaints with **no signup required**
- keyword-based classifier. **category detection** (Water, Electricity, Health, etc.)
- Auto-assignment to the correct **government department**
- Track complaints using **ticket ID (JB-XXXX)**
- JWT-authenticated **government dashboard**
- MongoDB Atlas integration
- Clean, modular **ES module** architecture

## 📁 Folder Structure

```
Based on the folder structure in the image, I'll add the specific files visible under each directory:

config/         # DB connection
  db.js         # Database configuration
controllers/    # Business logic
  complaint_controller.js  # Complaint handling logic
  gov_controller.js        # Government-related logic
middlewares/    # Auth & errors
  auth_middleware.js       # Authentication middleware
  error_middleware.js      # Error handling middleware
models/         # Mongoose schemas
  Complaint.js             # Complaint schema
  GovernmentUser.js        # Government user schema
routes/         # API routing
  complaint_routes.js      # Complaint API routes
  gov_routes.js            # Government API routes
services/       # Auth, classifier logic
  auth_service.js          # Authentication service
  classifier_service.js    # Classifier logic
utils/          # Ticket generator
  ticket_utils.js          # Ticket generation utilities
  env                      # Environment variables

Additionally, there are root-level files:
- app.js                  # Main application entry point
- package-lock.json       # Dependency lock file
- package.json            # Project metadata and dependencies
- .gitignore              # Git ignore rules
```

## 🌐 API Endpoints

### Citizens

#### Submit a Complaint

`POST /api/complaints`

```json
{
  "title": "Power outage",
  "description": "No electricity in my area for 3 days.",
  "senderName": "John Doe",
  "location": {
    "city": "Kigali",
    "district": "Gasabo",
    "sector": "Kacyiru"
  }
}
```

---

### Government

#### Register

`POST /api/gov/register`

```json
{
  "name": "RECO Official",
  "email": "reco@gov.rw",
  "password": "secret",
  "category": "Electricity"
}
```

#### Login

`POST /api/gov/login`  
Returns a JWT token.

#### Fetch Assigned Complaints

`GET /api/gov/complaints`  
(Protected route, requires JWT)

#### Respond to a Complaint

`POST /api/gov/complaints/:id/respond`

```json
{ "response": "Team is on the ground." }
```

---

## 🛠 Setup

```bash
git clone <repo-url>
cd citizen-engagement-system
npm install
cp .env.example .env
# Fill in MONGO_URI, JWT_SECRET in .env
npm run dev
```

---
