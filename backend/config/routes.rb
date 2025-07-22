Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  get "status", to: "home#status"
  root "home#index"

  resources :properties
  resources :amenities
  resources :bookings, only: [:create, :show, :update]

  resources :users do
    resources :bookings, only: [:index], controller: "bookings", action: :index_by_user # GET /users/:user_id/bookings
  end

  # User routes
  get "login", to: "sessions#new"
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"
  get "/me", to: "sessions#me"

  get "signup", to: "users#new"
  post "signup", to: "users#create"
end
