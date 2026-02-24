# Vista Rentals

Vista Rentals is a modern web application designed as an **Airbnb-inspired** full-stack property rental platform, connecting property owners with potential renters. The project is split into two main parts:

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

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) & [npm](https://www.npmjs.com/) (for frontend)
- [Ruby](https://www.ruby-lang.org/) 3.2+
- [Rails](https://rubyonrails.org/) 8+
- [SQLite3](https://www.sqlite.org/) (for development/test)

---

### Backend Setup (`backend/`)

1. **Clone the repository and enter the backend folder:**
   ```bash
   git clone https://github.com/shuveksha-tuladhar/vista-rentals-api.git
   cd vista-rentals-api/backend
   ```

2. **Install dependencies:**
   ```bash
   bundle install
   ```

3. **Set up the database:**
   ```bash
   rails db:create db:migrate db:seed
   ```
4. **Configure Environment Variables:**
   - Copy the example environment file and fill in the required secrets and configuration:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` with your preferred editor and set variables. 
     ```bash
        JWT_SECRET=         # jwt secret key
        PORT=               # 4000 or running port
        CORS_ORIGIN=        # http://localhost:5173 or frontend server
        STRIPE_SECRET_KEY=  # <stripe-api-key>
     ```
 

5. **Start the Rails server:**
   ```bash
   bin/rails server
   ```

### Frontend Setup (`frontend/`)

1. **Enter the frontend folder:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Copy the example environment file and adjust as needed:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` with your preferred editor and set variables as below
     ```bash
        VITE_STRIPE_PUBLISHABLE_KEY=    # <stripe-publishable-key from stripe.com>
        VITE_API_BASE_URL=              # http://localhost:4000
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or the port specified in your terminal).

5. **Build for production:**
   ```bash
   npm run build
   ```
