# Vista Rentals

Vista Rentals is a modern web application designed as an **Airbnb-inspired** full-stack property rental platform, connecting property owners with potential renters.

## Features

### Guest experience
- User authentication — sign up, log in, log out
- Browse property listings with filtering by location, guests, dates, and price
- Detailed property view with photo gallery, amenities, host info, reviews, and an interactive map
- Save and manage favourite properties
- Book properties with date selection and Stripe-powered checkout
- View booking confirmation and booking history

### Host experience
- Become a host via a multi-step listing wizard (property type, location, basics, bed setup, amenities, photos, pricing, description)
- Host dashboard — view, search, and paginate all owned listings
- Edit any listing: section-based form with a price slider, photo thumbnail grid (add/remove by URL), and live-fetched amenities with icons
- Delete a listing with inline confirmation
- Preview a listing as a guest directly from the listings dashboard

## Technology Stack

- **Backend:** Ruby on Rails 8 (API mode) — JWT auth, Stripe, Active Storage, RuboCop
- **Database:** SQLite (development & test)
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Zustand, react-router-dom, react-hook-form, Leaflet

## Setup

For detailed setup and configuration instructions, refer to the individual README files:

- [Frontend README](https://github.com/shuveksha-tuladhar/vista-rentals-api/blob/main/frontend/README.md)
- [Backend README](https://github.com/shuveksha-tuladhar/vista-rentals-api/blob/main/backend/README.md)
