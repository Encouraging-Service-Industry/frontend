# Encouraging Service Industry Frontend

## Overview

This project is a modern, user-centric web application for connecting consumers with service providers in the home and personal services industry. It is built with React, TypeScript, Vite, and Tailwind CSS, and features a comprehensive booking, story-sharing, and supplier verification flow. The application is designed for both consumers and service providers, offering a seamless experience for booking, managing, and providing services.

---

## Features

### For Consumers
- **Login/Signup**: Secure authentication for users.
- **Home Dashboard**: Personalized recommendations, quick search for services, and access to notifications.
- **Service Discovery**: Browse and filter services (e.g., Home Cleaning, Appliance Repair, Errands, Gardening) with provider/vendor details.
- **Provider Profiles**: View detailed provider information, ratings, reviews, and company affiliation.
- **Booking Flow**: Step-by-step booking process for scheduling services.
- **Chat**: In-app chat with service providers.
- **Story Wall**: Community-driven story sharing and engagement (post, like, comment).
- **Value Dashboard**: Visualize time saved, stress reduced, and achievements unlocked by using services.
- **Personal Area (Mine)**: Manage orders, profile, settings, achievements, and personal stories.
- **Notifications**: Real-time updates for orders, chats, reminders, and new services.

### For Service Providers (Suppliers)
- **Supplier Welcome & Signup**: Onboarding for new providers.
- **Verification Dashboard**: Track and complete verification steps (ID, business license, background check, portfolio).
- **Qualification Review**: Upload and track status of business credentials.
- **Background Check**: Information and status for background verification.
- **Portfolio Setup**: Showcase work, upload media, and manage certifications.
- **Supplier Notifications**: Updates on verification, document status, and achievements.

---

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, custom CSS
- **State Management**: React hooks (useState, useEffect, useMemo)
- **Linting**: ESLint
- **Build Tools**: Vite, TypeScript

---

## Project Structure

```
frontend/
├── public/
│   └── assets/           # Images and static assets
├── src/
│   ├── App.tsx           # Main app logic and navigation
│   ├── data.ts           # Mock data for providers, vendors, services
│   ├── pages/            # All page components (Home, Services, Booking, Supplier, etc.)
│   ├── assets/           # App-specific assets (e.g., logos)
│   ├── App.css           # App-level styles
│   ├── index.css         # Global and Tailwind styles
│   └── main.tsx          # App entry point
├── index.html            # HTML template
├── package.json          # Project metadata and scripts
├── tsconfig*.json        # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── ...
```

---

## Key Files & Folders
- `src/pages/`: Contains all main UI pages, including consumer and supplier flows.
- `src/data.ts`: Centralized mock data for services, providers, vendors, and reviews.
- `public/assets/`: Images for avatars, logos, and service categories.
- `App.tsx`: Handles navigation and state for the entire app.

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App
- Start the development server:
  ```sh
  npm run dev
  ```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
- Build the app:
  ```sh
  npm run build
  ```
- Preview the production build:
  ```sh
  npm run preview
  ```

---

## Customization & Extending
- **Add new services/providers**: Update `src/data.ts`.
- **UI Customization**: Modify components in `src/pages/` and styles in `src/index.css` or `src/App.css`.
- **Supplier Flow**: Extend supplier onboarding and verification in the relevant `src/pages/Supplier*` files.

---

## License
This project is for educational and demonstration purposes. For commercial use, please contact the authors.

---

## Credits
- UI/UX: Inspired by modern service platforms.
- Demo images: Placeholders and royalty-free assets.
- Developed by the Encouraging Service Industry team.
