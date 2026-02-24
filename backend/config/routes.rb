Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  get "status", to: "home#status"
  root "home#index"

  resources :properties do
    collection do
      get :location   # GET /properties/location
    end
  end

  resources :amenities
  resources :bookings, only: [:create, :show, :update]

  get  "/host/listings",      to: "host_listings#index"
  patch "/host/listings/:id", to: "host_listings#update"
  delete "/host/listings/:id", to: "host_listings#destroy"

  resources :users do
    resources :bookings, only: [:index], controller: "bookings", action: :index_by_user # GET /users/:user_id/bookings
  end

  post "/checkout/create", to: "checkouts#create_payment_intent"
  get "/checkout/payment-intent-status/:id", to: "checkouts#payment_intent_status"

  # User routes
  get "login", to: "sessions#new"
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"
  get "/me", to: "sessions#me"

  get "signup", to: "users#new"
  post "signup", to: "users#create"
end
