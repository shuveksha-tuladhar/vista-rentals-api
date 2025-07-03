class HomeController < ApplicationController
  skip_before_action :authorize_request, only: [:index, :status]

  def index
    render json: { message: "Welcome to the API" }, status: :ok
  end

  def status
    render json: { status: "OK" }, status: :ok
  end
end
