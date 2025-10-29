# Encouraging Service Industry – Frontend

## Overview

A modern React + TypeScript single-page experience built with Vite and Tailwind CSS. The app demonstrates both consumer and supplier journeys: discovering services, booking, tracking, story sharing, supplier verification – plus interactive gamified education around time value.

Key highlights:
- Tab-based navigation managed in `App.tsx` (no external router)
- Demo authentication, orders and notifications persisted in `localStorage`
- Time coins and marketplace redemption
- New interactive mini-game: Time Energy Puzzle (drag-and-drop with storytelling visuals)

### Background and Vision
This project aims to encourage earlier and more frequent use of everyday services by normalizing outsourcing and building trust. The long-term vision (from project docs) is to help middle-aged individuals form sustainable habits around using services, reducing burnout and creating a trusted network as they age.

### Core Problem We Address
- Social stigma and trust barriers around hiring help
- Difficulty seeing the "true value" (time, energy, and well-being) gained from outsourcing
- Overly complex booking experiences

### Our Approach
- Social proof and storytelling (Story Wall) to normalize usage
- Value Dashboard to translate time saved into relatable life moments
- Streamlined discovery and booking
- Strong supplier verification concepts (welcome and verification screens)
- Habit formation nudges (rewards, Time Coins, the Time Energy Puzzle mini-game)

---

## Tech Stack
- React 19, TypeScript 5, Vite 7
- Tailwind CSS 4 (via `@tailwindcss/vite`) and small custom CSS in `src/index.css`
- ESLint 9

Scripts (package.json):
- `npm run dev` – start Vite dev server
- `npm run build` – type-check and build (`tsc -b && vite build`)
- `npm run preview` – preview production build
- `npm run lint` – run ESLint

---

## Project Structure

```
frontend/
├── public/
│   └── assets/                      # Static images (brand, avatars, categories, marketplace)
├── src/
│   ├── components/                  # Reusable UI parts (e.g., Footer)
│   ├── hooks/                       # Reusable hooks (e.g., investment calculator)
│   ├── pages/                       # Page-like components (rendered via App.tsx tab state)
│   │   ├── HomePage.tsx             # Hero, search, value dashboard preview, game entry card
│   │   ├── ServicesPage.tsx         # Service discovery
│   │   ├── ProviderListPage.tsx     # Providers list by category
│   │   ├── ProviderDetailPage.tsx   # Provider detail with actions
│   │   ├── BookingFlowPage.tsx      # Demo booking flow
│   │   ├── ChatPage.tsx             # Demo chat screen
│   │   ├── ValueDashboardDetailPage.tsx
│   │   ├── TimeCoinMarketplace.tsx  # Redeem items for time coins
│   │   ├── OrdersPage.tsx / OrderDetailPage.tsx
│   │   ├── NotificationsPage.tsx    # Local notifications inbox
│   │   ├── StoryWallPage.tsx        # Social stories
│   │   ├── MinePage.tsx             # Profile hub (orders, stories, etc.)
│   │   ├── Supplier*                 # Supplier onboarding & verification flow
│   │   └── TimeEnergyPuzzlePage.tsx # NEW: interactive drag-and-drop mini-game
│   ├── data.ts                      # Mock data: services, providers, vendors, orders, notifications types
│   ├── types/                       # Shared types (e.g., story)
│   ├── App.tsx                      # App shell, top nav, tab-based routing, global state
│   ├── main.tsx                     # React entry
│   ├── index.css                    # Tailwind + custom animations/utilities
│   ├── App.css                      # Minimal additional styles
│   └── ...
├── vite.config.ts                   # Vite + React + Tailwind plugin
├── tsconfig*.json                   # TypeScript config
└── package.json
```

---

## Navigation Model

The app does not use React Router. Instead, `App.tsx` keeps a `tab` state controlling which page component renders.

- Tabs include: `login`, `splash`, `home`, `story`, `services`, `provider-list`, `provider-detail`, `chat`, `booking`, `mine`, `notifications`, `value-dashboard-detail`, `timecoin-marketplace`, `vendor-detail-view`, `order-detail`, `redemption-detail`, `supplier-*`, `location-tracking`, and `time-energy-puzzle`.
- Top navigation and page CTAs set `tab` via `handleSetTab`.

Implications:
- Linking is via button clicks updating `tab`
- Deep linking via URL paths is not configured (can be added later)

---

## Target Users

- Busy professionals (30–40) balancing work and family
- Adult children booking services for aging parents
- New parents looking to reduce household friction

Key user stories represented in the UI (from requirements):
- See peer usage and recommendations to build trust (Story Wall concept)
- Visualize benefits so outsourcing feels like investing in family and health (Value Dashboard)
- Quick and simple booking flows
- Rewards and small habit-building nudges (Time Coins, achievements, mini-game)

---

## Data, State, and Persistence

- Mock domain data in `src/data.ts` (services, providers, vendors)
- Global app state in `App.tsx` (authentication, user name, current provider/vendor, orders, notifications, coins)
- Persistence via `localStorage` for:
  - Orders: `demo_orders_v1`
  - Current order id: `demo_currentOrderId_v1`
  - Notifications: `demo_notifications_v1`

Time Coins:
- User coin balance is managed in `App.tsx` and used in `TimeCoinMarketplace`
- The Time Energy Puzzle adds 50 coins on victory claim

---

## Home Experience

`HomePage.tsx` contains:
- Hero with CTA to explore services
- Search (service + location)
- Time Value dashboard preview (click to open detailed view)
- Become a Provider card (supplier entry)
- Game entry card “Find Your Life Balance” (below the two cards)
- Smart recommendation block
- Popular services grid

---

## Time Energy Puzzle (Game)

`src/pages/TimeEnergyPuzzlePage.tsx` implements an HTML5 drag-and-drop mini-game teaching the value of outsourcing.

Core mechanics:
- 3x3 grid initialized with random “drain” tasks
- Drag drain tasks into the “Outsource Zone” to replace them with random “boost” tasks
- Track progress (3 tasks outsourced to win)
- Victory modal offering to claim 50 Time Coins

Storytelling and visuals:
- Gloomy-to-vibrant background transition tied to progress
- Background lifestyle image opacity increases with each outsourced task
- Drain cards are desaturated with heavier shadow; removing a drain triggers a subtle sparkle animation
- Boost cards appear saturated with a gentle pulse animation
- Adaptive titles: “My Life Buried in Chores” → “Finding Space for What Matters” → “Life Unlocked! This Could Be Your Reality”

---

## Differentiation (vs. typical marketplaces)

- Positioning: from “transactional booking” to “habit-forming lifestyle coach”
- Trust: supplier verification scaffolding and clear value visualizations
- Social proof: stories and data-driven encouragement (concept)
- Family scenarios: intended support for booking for others (concept)

These differentiators are reflected in the current demo UI, with room to expand into richer analytics, coaching, and community features.

---

## Supplier Flow (Overview)

Pages include `SupplierWelcome`, `SupplierVerificationDashboard`, `SupplierQualificationReview`, `SupplierBackgroundCheck`, `SupplierPortfolioSetup`, `SupplierNotifications`.

These screens demonstrate a scaffold of a verification/onboarding process a provider would complete to join the marketplace.

---

## Orders, Tracking, and Notifications

- Booking flow from provider detail
- Orders list and detail, with a simple `onSimulateConfirm` action
- Location tracking demo screen (`LocationTrackingPage`) for a booked provider
- Notifications inbox with mark-as-read and delete (stored in `localStorage`)

---

## MVP Scope Implemented (Frontend)

- P0-aligned UI screens: login, discovery, provider details, simplified booking, orders, notifications
- Value dashboard preview and detailed view with computed portfolio
- Supplier onboarding scaffolding (verification screens)
- Trust cues in provider details (mock data)
- Gamified education (Time Energy Puzzle) with reward loop (Time Coins)

Not included (future/back-end driven): real auth, payments, admin tools, moderation, geospatial services, background checks, and real-time chat.

---

## Getting Started

Prerequisites:
- Node.js 18+
- npm 9+

Install and run:
```sh
npm install
npm run dev
```
Open `http://localhost:5173`.

Build and preview:
```sh
npm run build
npm run preview
```

---

## Styling

- Tailwind CSS v4 enabled via `@tailwindcss/vite` plugin in `vite.config.ts`
- Global styles and animation keyframes in `src/index.css` (e.g., `sparkle-pop`, `soft-pulse`, `gloom-overlay`, `vibrant-overlay`)
- Component-level classes throughout pages and components

---

## Extending the App

- Add a new service/provider: update `src/data.ts`
- Add a new page/tab:
  1) Create a component in `src/pages/`
  2) Import and render it in `App.tsx` under a new `tab` value
  3) Trigger navigation by calling `handleSetTab("your-tab")`
- Wire a new CTA on the home page: update `HomePage.tsx` props and add a button handler

---

## Notes

- This is a demo app: authentication is simulated; all server interactions are mocked
- Assets are located under `public/assets/`
- No need to modify the `extracted/` folder – it's unrelated to the running app

---

## License

This project is for educational and demonstration purposes. For commercial use, please contact the authors.

---

## Credits

- UI/UX: Inspired by modern service platforms
- Demo images: Placeholders and royalty-free assets
- Developed by the Encouraging Service Industry team
