class SessionsController < ApplicationController
  skip_before_action :authorize_request, only: [:create]
  # POST /login
  def create
    user = User.find_by(username: params[:username])

    if user&.authenticate(params[:password])
      token = encode_token({ user_id: user.id, username: user.username })

      render json: {
        message: "Logged in successfully.",
        token:,
        user: user.slice(:id, :username, :email, :role),
      }, status: :ok
    else
      render json: { error: "Invalid username or password." }, status: :unauthorized
    end
  end

  # DELETE /logout (optional if using client-side token storage)
  def destroy
    # For stateless JWT, logout is handled client-side (e.g., remove token)
    render json: { message: "Logged out successfully (client should discard token)." }, status: :ok
  end

  private

  def encode_token(payload)
    JWT.encode(payload, Rails.application.credentials.jwt_secret || ENV["JWT_SECRET"], "HS256")
  end
end
