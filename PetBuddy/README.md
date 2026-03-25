# PetCare Pro 🐾

Welcome to **PetCare Pro**, a premium pet management dashboard built with React and Supabase. It helps pet owners track health, scheduling, and growth with professional precision.

## 🌟 Key Features
- **Interactive Dashboard**: Real-time overview of all your companions.
- **Advanced Health Logs**: Track vaccinations, medical history, and notes.
- **Micro-animated Visualization**: Pure SVG activity rings and smooth spline weight charts.
- **Pet ID Passport**: Official-looking identity cards with QR/Barcode simulation.
- **Smart Auth**: Secure login via Supabase with automatic welcome notifications.
- **Dark Mode**: High-contrast, premium dark theme for night-time care.

## 🛠 Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Supabase (Auth + PostgreSQL)
- **UI/UX**: Vanilla CSS with advanced @keyframes and glassmorphism.
- **Email**: EmailJS for event-driven notifications.

## 🚀 Getting Started

### 1. Prerequisite (Supabase Setup)
Create a new Supabase project and run the queries found in the dashboard or create the following tables:
- `pets` (id, user_id, name, type, breed, age)
- `health_logs` (id, pet_id, date, type, note)
- `tasks` (id, pet_id, title, time, completed)
- `weight_logs` (id, pet_id, date, weight)

### 2. Environment Variables
Create a `.env` file in the root:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_EMAIL_SERVICE_ID=your_emailjs_service_id
VITE_EMAIL_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAIL_PUBLIC_KEY=your_emailjs_public_key
```

### 3. Run locally
```bash
npm install
npm run dev
```

---
*PetCare Pro — Because your companions deserve the best.*
