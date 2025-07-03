class ApplicationController < ActionController::API
  before_action :authorize_request

  attr_reader :current_user

  private

  def authorize_request
    header = request.headers["Authorization"]
    token = header.split(" ").last if header

    begin
      decoded = JWT.decode(token, jwt_secret, true, algorithm: "HS256")
      user_id = decoded[0]["user_id"]
      @current_user = User.find(user_id)
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      render json: { error: "Unauthorized or invalid token" }, status: :unauthorized
    end
  end

  def jwt_secret
    Rails.application.credentials.jwt_secret || ENV["JWT_SECRET"]
  end
end
