# 🟠 Jambo Frontend — Citizen Complaints & Engagement System

This is the frontend for **Jambo**, a minimal yet powerful MVP that allows citizens to submit complaints and government officials to view, manage, and respond to them. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, the UI is clean, responsive, and optimized for ease of use on both desktop and mobile.

## 📁 Project Structure

This app uses the **App Router** (`/app`) provided by Next.js 13+ with TypeScript.

app/
│
├── page.tsx # Landing page for citizens
├── dashboard/ # Government admin dashboard
│ ├── page.tsx # Admin home
│ └── settings/ # Admin settings page
├── components/ # Reusable UI components (Sidebar, Cards, etc.)
├── lib/ # API utilities (Axios, helpers)
├── types/ # TypeScript interfaces and types
└── styles/ # Global styles if any


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
