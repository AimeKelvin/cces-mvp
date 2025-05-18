# Jambo Frontend — Citizen Complaints & Engagement System

This is the frontend for **Jambo**, a minimal yet powerful MVP that allows citizens to submit complaints and government officials to view, manage, and respond to them. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, the UI is clean, responsive, and optimized for ease of use on both desktop and mobile.

## 📁 Project Structure

This app uses the **App Router** (`/app`) provided by Next.js 13+ with TypeScript.
```
jambo-frontend/
│
├── public/ # Static assets
│   └── favicon.ico # Website favicon
├── src/ # Source code
│   ├── app/ # Application routes and pages
│   │   ├── about/ # About page
│   │   ├── contact/ # Contact page
│   │   ├── report/ # Report page
│   │   ├── track/ # Track page
│   │   ├── page.tsx # Main landing page
│   │   ├── dashboard/ # Government admin dashboard
│   │   ├── login/ # Login page
│   │   ├── signup/ # Signup page
│   │   ├── globals.css # Global CSS styles
│   │   └── layout.tsx # Layout component for app structure
│   ├── components/ # Reusable UI components
│   │   ├── customs/ # Custom components
│   │   ├── citizen/ # Citizen-specific components
│   │   └── gov/ # Government-specific components
│   ├── ui/ # UI-related utilities or components
│   ├── hooks/ # Custom React hooks
│   └── lib/ # Utility functions and API helpers
└── .env.local # Local environment variables
```

## ⚙️ Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install

npm run dev
# or
yarn dev
```
Open http://localhost:3000 to view the app.
