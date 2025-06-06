Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  root "properties#index"
  resources :properties

  # User routes
  get "login", to: "sessions#new"
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"

  get "signup", to: "users#new"
  post "signup", to: "users#create"
end
