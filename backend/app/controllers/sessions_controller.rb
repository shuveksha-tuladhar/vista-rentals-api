class SessionsController < ApplicationController
  include ActionController::Cookies
  skip_before_action :authorize_request, only: [:create, :destroy]

  # POST /login
  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      cookies.signed[:user_id] = {
        value: user.id,
        httponly: true,
        secure: Rails.env.production?,
        same_site: :strict,
        expires: 24.hours.from_now,
      }

      render json: {
               message: "Logged in successfully.",
               user: user.slice(:id, :first_name, :last_name, :email, :role),
             }, status: :ok
    else
      render json: { error: "Invalid username or password." }, status: :unauthorized
    end
  end

  # DELETE /logout
  def destroy
    cookies.delete(:user_id, {
      httponly: true,
      secure: Rails.env.production?,
      same_site: :strict,
    })

    render json: { message: "Logged out successfully." }, status: :ok
  end
end
