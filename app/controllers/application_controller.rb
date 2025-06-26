class ApplicationController < ActionController::API
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  # before_action :require_login
  # allow_browser versions: :modern
  helper_method :current_user, :logged_in?, :admin?

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def logged_in?
    current_user.present?
  end

  def admin?
    logged_in? && current_user.role == "admin"
  end

  def require_login
    unless logged_in?
      redirect_to login_path, alert: "Please log in first."
    end
  end

  def require_admin
    unless admin?
      redirect_to root_path, alert: "You are not authorized to access this page."
    end
  end
end
