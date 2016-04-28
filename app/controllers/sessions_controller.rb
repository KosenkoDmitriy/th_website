class SessionsController < ApplicationController
  def create
    # render text: request.env['omniauth.auth'].to_json #.to_yaml
    # begin
      user = User.from_omniauth(request.env['omniauth.auth'])
      session[:user_id] = user.try(:id)

      if (user.last_login_dt.present? && user.last_login_dt <= DateTime.now - 1) || user.last_login_dt.blank? # yesterday login or first login
        user.update_column(:last_login_dt, DateTime.now)
        if user.credits.nil?
          user.credits = Rails.configuration.x.win_for_reg
          flash[:notice] = "you got #{ fcredits Rails.configuration.x.win_for_reg } credits for sign up"
        end
        # user.credits += Rails.configuration.x.win_for_login
        # flash[:notice2] = "you got #{ fcredits Rails.configuration.x.win_for_login } credits for sign in"
        user.save!
      end

      # flash[:success] = "Welcome, #{user.name}!"
      redirect_to user
    # rescue
    #   flash[:warning] = "There was an error while trying to authenticate you..."
    # end
    # redirect_to root_path
  end
end
