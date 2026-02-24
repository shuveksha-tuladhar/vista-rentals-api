# Vista Rentals — Frontend

## Overview

React frontend for Vista Rentals, a property rental platform. Lets users browse and book properties, manage favorites, and host their own listings.

## Tech Stack

- **React** 19
- **TypeScript** 5.8
- **Vite** 7
- **Tailwind CSS** v4
- **State management** Zustand 5
- **Routing** react-router-dom 7
- **Forms** react-hook-form 7
- **HTTP** axios
- **Maps** Leaflet + react-leaflet
- **Payments** @stripe/react-stripe-js + @stripe/stripe-js
- **Date picking** react-date-range + date-fns
- **Icons** react-icons

## Requirements

- Node.js >= 20.19.0
- npm

## Environment Setup

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the Rails API (e.g. `http://localhost:3000`) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for the payment form |

## Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type-check and build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Architecture Overview

- **Routing**: `react-router-dom` with protected routes enforced via a `ProtectedRoute` wrapper component.
- **Global state**: Zustand stores for auth (`authStore`), booking search filters (`bookingStore`), favorites (`favoritesStore`), and toast notifications (`toastStore`).
- **Forms**: All user-input forms use `react-hook-form`.
- **API calls**: Centralized via `axios` with `withCredentials: true` to send the session cookie.
- **Maps**: Leaflet is used on the property details page and a dedicated map view to show property locations.
- **Payments**: Stripe Elements are embedded in the booking checkout flow.

## Pages

| Page | Path | Description |
|---|---|---|
| `LandingPage` | `/` | Property grid with search bar (location, check-in/out, guests) |
| `PropertyDetails` | `/property/:id` | Full property detail view with map, amenities, reviews, and booking panel |
| `SummaryPage` | `/review` | Booking summary with Stripe payment form |
| `BookingComplete` | `/complete` | Post-booking confirmation screen |
| `BecomeAHost` | `/become-a-host` | Multi-step form for creating a new property listing |
| `HostListings` | `/host/listings` | Host dashboard listing all owned properties with edit, delete, and preview actions |
| `EditListingPage` | `/host/listings/:id/edit` | Edit an existing property listing — section-based form with price slider, photo thumbnail grid, and live-fetched amenities |
| `FavoritesPage` | `/favorites` | Saved/favorited properties |
| `PropertiesMapView` | `/properties` | Full map view of all properties |
| `AboutUs` | `/about-us` | About page |

