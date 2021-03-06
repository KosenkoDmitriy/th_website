class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id] && User.exists?(session[:user_id])
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
    if !current_user
      flash[:notice] = "please relogin"
      redirect_to signin_get_path
      return
    end
  end

  include ActionView::Helpers::NumberHelper

  def fcredits credits
    number_with_delimiter credits.to_i
  end
  helper_method :fcredits

  def fcost cost_in_cents
    fcost = cost_in_cents/100 rescue 0
    fcredits = number_to_currency(fcost)
  end
  helper_method :fcost


  def fdate(date)
    date.strftime("%d/%m/%Y %I:%M %p")
  end
  helper_method :fdate

end
