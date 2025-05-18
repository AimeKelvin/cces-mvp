# 📣 Citizen Engagement System Backend (MVP)

A full-stack-ready backend API that enables citizens to submit public complaints, automatically routes them to relevant government agencies using keyword-based classifier algorithm, and allows government officials to register, manage, and respond to them.

## API BASE URL hosted on Render: https://complaint-aqv0.onrender.com

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
config/         # Database connection settings  
controllers/    # Core business logic for handling requests  
middlewares/    # Middleware for authentication and error handling  
models/         # Mongoose schemas for data modeling  
routes/         # API endpoint routing definitions  
services/       # Logic for authentication and classification services  
utils/          # Utility functions, including ticket generation  

Root-level files include the main app entry, dependency configurations, and Git ignore rules.
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
