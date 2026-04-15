# PetBuddy 🐾

Welcome to **PetBuddy**, a premium, local-only pet management dashboard. It helps pet owners track health, scheduling, and growth with professional precision—all without needing a cloud backend!

## 🌟 Key Features
- **Interactive Dashboard**: Real-time overview of all your companions.
- **Advanced Health Logs**: Track vaccinations, medical history, and notes.
- **Micro-animated Visualization**: Pure SVG activity rings and smooth spline weight charts.
- **Pet ID Passport**: Official-looking identity cards with QR/Barcode simulation.
- **Local Persistence**: Your data is stored securely in your browser's local storage.
- **Dark Mode**: High-contrast, premium dark theme for night-time care.

## 🛠 Tech Stack
- **Frontend**: React (Vite)
- **Data**: Client-side storage via `localStorage`.
- **UI/UX**: Vanilla CSS with advanced @keyframes and glassmorphism.
- **Email**: EmailJS for event-driven notifications.

## 🚀 Getting Started

### 1. Environment Variables
Create a `.env` file in the root if you wish to use Email notifications:
```env
VITE_EMAIL_SERVICE_ID=your_emailjs_service_id
VITE_EMAIL_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAIL_PUBLIC_KEY=your_emailjs_public_key
```

### 2. Run locally
```bash
npm install
npm run dev
```

---
*PetBuddy — Because your companions deserve the best.*
