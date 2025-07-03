class UsersController < ApplicationController
  skip_before_action :authorize_request, only: [:create]
  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      # You might replace session logic with token generation in a real API
      session[:user_id] = @user.id
      session[:role] = @user.role

      render json: {
        message: "Account created and logged in!",
        user: @user.slice(:id, :username, :email, :role),
      }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password_hash, :role)
  end
end
