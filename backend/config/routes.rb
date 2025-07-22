Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  get "status", to: "home#status"
  root "home#index"

  resources :properties
  resources :amenities

  # User routes
  get "login", to: "sessions#new"
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"
  get "/me", to: "sessions#me"

  get "signup", to: "users#new"
  post "signup", to: "users#create"
end
