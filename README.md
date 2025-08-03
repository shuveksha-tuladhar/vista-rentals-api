# Vista Rentals

Vista Rentals is a modern web application designed as an **Airbnb clone** to serve as a full-featured property rental platform, connecting property owners with potential renters. The project is split into two main parts:

The platform allows users to:

- List their properties with ease
- Discover vacation rentals in various locations

## Features

- User authentication (sign up, log in, log out)
- Property listing and detailed property view
- User dashboard for managing owned properties and bookings
- Upload multiple images per property
- Responsive, intuitive UI with filtering and searching

## Technology Stack

- **Backend:** Ruby on Rails 7
- **Database:** SQLite (development & test)
- **Frontend:** React, TypeScript, Vite, Tailwind CSS

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) & [npm](https://www.npmjs.com/) (for frontend)
- [Ruby](https://www.ruby-lang.org/) 3.2+
- [Rails](https://rubyonrails.org/) 7+
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


