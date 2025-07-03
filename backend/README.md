## Vista Rentals

Vista Rentals is a modern web application designed to serve as a full-featured property rental platform. It connects property owners with potential renters, offering a seamless experience for booking both short-term and long-term stays.

The platform allows users to:

- List their properties with ease
- Discover vacation rentals in various locations

### Features
- User authentication (sign up, log in, log out)
- Property listing and detailed property view
- User dashboard for managing owned properties and bookings
- Upload multiple images for each property

## Technology Used
- **Backend**: Ruby on Rails 7
- **Database**: SQLite (development & test)
- **Frontend**: JavaScript with Bootstrap 5 with ERB 


## Getting Started

### Prerequisites

- Ruby 3.2+  
- Rails 7+  
- SQLite3

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shuveksha-tuladhar/vista-rentals
```

2. Install dependencies:
```bash
bundle install
```

3. Set up the database:
```bash
rails db:create db:migrate db:seed
```

4. Start the Rails server:
```bash
bin/rails server
```

5. Visit the app at http://localhost:3000


