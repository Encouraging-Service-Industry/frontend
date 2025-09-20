# Service Industry App – Frontend

## Overview

This is the frontend for the Service Industry App, designed to help users efficiently outsource daily tasks (like home cleaning, appliance repair, errands, etc.) and connect with trusted service providers. The UI is mobile-first, intuitive, and built with React (see `src/`), with rapid prototyping using Tailwind CSS (`consumer-UI-demo.html`, `tenplateui.html`).

## Folder Structure

- `src/` – Main React source code (pages, components, data)
- `public/` – Static assets (e.g., icons)
- `extracted/` – Extracted project documents (requirements, plans)
- `consumer-UI-demo.html` – HTML prototype for UI/UX reference
- `tenplateui.html` – Additional UI template for prototyping
- `README.md` – This file

## Main UI Screens

### Splash Screen
- Welcome page with logo and "Get Started" button

### Home Screen
- Personalized greeting (e.g., "Good Afternoon, Anna")
- Value Dashboard: Shows time saved by outsourcing
- Smart Recommendations: Suggests services based on user history
- Quick Access: Popular service icons for fast booking

### Service Categories
- Browse service categories (Home Cleaning, Appliance Repair, Errands, Gardening, etc.)
- Search and sort services by name or provider count
- Filter providers by vendor, rating, location

### Provider List & Detail
- View providers for a selected service
- Provider cards show avatar, rating, reviews, description
- Provider detail page includes credentials, badges, experience, and options to chat or book

### Booking Flow
- 3-step booking: Select time/address, confirm details, finish booking
- Option to book for someone else
- Price breakdown and confirmation

### Orders
- View order history and status (Completed, In Progress)
- Provider and date info

### Community Story Wall
- Social feed of user stories and achievements
- "Share Your Story" button
- Badges for milestones (e.g., "First-Timer")

### Vendors
- Browse vendor companies
- Vendor detail page lists company info and associated providers

### Profile
- User info, contact, version, and "About Us"

### Chat
- Direct chat interface with providers

### Navigation
- Bottom navigation bar for Home, Story Wall, Services, Vendors, Profile

## Data Structure

- Vendors, providers, and service categories are defined in `src/data.ts`.
- Each provider and vendor includes ratings, reviews, description, certifications, and coverage areas.

## How It Works

- **React SPA**: The app uses React for all main flows. State is managed via hooks in `App.tsx`.
- **Navigation**: Tab state controls which screen is shown. BottomNav updates the tab.
- **Booking**: Booking flow is step-based, with validation and summary before confirmation.
- **Filtering**: Service and provider lists can be filtered and sorted.
- **Prototyping**: HTML files (`consumer-UI-demo.html`, `tenplateui.html`) provide static UI references and can be used for rapid design iteration.

## Getting Started

1. **Install dependencies**  
   ```sh
   npm install
   ```

2. **Run the development server**  
   ```sh
   npm run dev
   ```

3. **Build for production**  
   ```sh
   npm run build
   ```

## Customization

- Update service categories, vendors, and providers in `src/data.ts`.
- UI can be themed via Tailwind CSS classes.
- Add new screens or flows in `src/pages/`.

## References

- `src/App.tsx` – Main app logic and navigation
- `src/pages/` – All UI screens
- `src/components/BottomNav.tsx` – Navigation bar
- `src/data.ts` – Data models and mock data

---

For more details, see the UI prototypes:  
- `consumer-UI-demo.html`  
- `tenplateui.html`

And the requirements in `extracted/Project Requirement Document-v6.txt`.
