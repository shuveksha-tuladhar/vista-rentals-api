# Vista Rentals — Backend

## Overview

REST API for Vista Rentals, a property rental platform. Handles user authentication, property listings, bookings, and Stripe payment processing.

## Tech Stack

- **Ruby** 3.2.2
- **Rails** 8.0.1 (API mode)
- **Database** SQLite3
- **Auth** Cookie-based sessions (signed `user_id` cookie)
- **Payments** Stripe
- **Password hashing** bcrypt
- **CORS** rack-cors
- **Testing** RSpec 7
- **Linting** RuboCop (rubocop-rails-omakase)
- **Deployment** Docker + Kamal

## Requirements

- Ruby 3.2.2
- Bundler
- SQLite3

## Environment Setup

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `JWT_SECRET` | Reserved — present in Gemfile but not used by application auth |
| `PORT` | Port to bind the server to |
| `CORS_ORIGIN` | Allowed frontend origin (e.g. `http://localhost:5173`) |
| `STRIPE_SECRET_KEY` | Stripe secret key for payment processing |
| `HOST_LISTINGS_PER_PAGE` | Number of listings per page on the host dashboard (default: 12) |

## Available Commands

```bash
# Install dependencies
bundle install

# Set up database
bin/rails db:create db:migrate db:seed

# Start development server
bin/rails server

# Run tests
bundle exec rspec

# Lint
bundle exec rubocop
```

## Docker

```bash
# Build image
docker build -t vista-rentals-api .

# Run container
docker run -e SECRET_KEY_BASE=your_key -e CORS_ORIGIN=http://localhost:5173 -e STRIPE_SECRET_KEY=your_key -p 3000:3000 vista-rentals-api
```

The entrypoint runs `db:migrate` and `db:seed` automatically before starting the server.

## Architecture Overview

- **Auth**: All endpoints are protected by a `before_action :authorize_request` in `ApplicationController` that reads a signed `user_id` cookie. Public endpoints explicitly skip this filter.
- **Roles**: Users have a `role` of either `user` or `admin`.
- **Hosts**: A `Host` record is created for a user the first time they create a property listing.
- **Properties**: Support nested attributes for images, amenities, rules, safety notes, and bed info.
- **Payments**: Stripe `PaymentIntent` is created at checkout. The booking's `payment_status` is updated to `complete` or `failed` when the client confirms payment.

## API Overview

| Method | Path | Auth Required | Description |
|---|---|---|---|
| GET | `/status` | No | Health check |
| POST | `/signup` | No | Register a new user |
| POST | `/login` | No | Log in, sets signed cookie |
| DELETE | `/logout` | No | Log out, clears cookie |
| GET | `/me` | Yes | Return current user info |
| GET | `/properties` | No | List properties (filterable by `query`, `state`, `city`, `guests`, `checkIn`, `checkOut`) |
| GET | `/properties/location` | No | List distinct city/state combinations |
| GET | `/properties/:id` | No | Get full property details with reviews, amenities, images, host |
| POST | `/properties` | Yes | Create a new property listing |
| PATCH/PUT | `/properties/:id` | Yes | Update a property |
| DELETE | `/properties/:id` | Yes | Delete a property |
| GET | `/amenities` | Yes | List amenities (filterable by `query`) |
| GET | `/amenities/:id` | Yes | Get a single amenity |
| POST | `/amenities` | Yes | Create an amenity |
| PATCH/PUT | `/amenities/:id` | Yes | Update an amenity |
| DELETE | `/amenities/:id` | Yes | Delete an amenity |
| POST | `/bookings` | Yes | Create a booking |
| GET | `/bookings/:id` | Yes | Get a booking |
| PATCH | `/bookings/:id` | Yes | Update booking payment status |
| GET | `/users/:user_id/bookings` | Yes | List all bookings for a user |
| GET | `/host/listings` | Yes | List current user's property listings |
| PATCH | `/host/listings/:id` | Yes | Update a host's listing (title, description, price, photos, amenities) |
| DELETE | `/host/listings/:id` | Yes | Delete a host's listing |
| POST | `/checkout/create` | Yes | Create a Stripe PaymentIntent |
| GET | `/checkout/payment-intent-status/:id` | Yes | Get Stripe PaymentIntent status |
