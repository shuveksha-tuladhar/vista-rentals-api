class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize_request

  attr_reader :current_user

  private

  def authorize_request
    user_id = cookies.signed[:user_id]

    if user_id
      @current_user = User.find_by(id: user_id)
      return if @current_user
    end

    render json: { error: "Unauthorized" }, status: :unauthorized
  end
end
