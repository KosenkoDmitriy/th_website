class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def credits
    @credits ||= Credit.all
  end
  helper_method :credits

  def order_new
    @order_new ||= Order.new(:express_token => params[:token])
  end
  helper_method :order_new

  def check_permissions
    uid =  params[:user_id] || params[:id]
    if !current_user
      flash[:notice] = "please relogin"
      redirect_to signin_get_path
      return
    elsif current_user && current_user.id != uid.to_i
      redirect_to current_user
      return
    end
  end

end
