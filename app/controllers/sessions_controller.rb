class SessionsController < ApplicationController
  def create
    # render text: request.env['omniauth.auth'].to_json #.to_yaml
    # begin
      user = User.from_omniauth(request.env['omniauth.auth'])

      if !user.present?
        flash[:error] = t("user.empty")
        redirect_to sign_in_up_path and return
      end

      if !user.is_active?
        flash[:error] = t("user.blocked")
        redirect_to sign_in_up_path and return
      end

      session[:user_id] = user.try(:id)

      user.generate_key_invite user.email,session[:k]

      user.key = ApplicationHelper.gk(user.email, user.password) if session[:is_mobile]

      if (user.last_login_dt.present? && user.last_login_dt <= DateTime.now - 1) || user.last_login_dt.blank? # yesterday login or first login
        user.update_column(:last_login_dt, DateTime.now)
        LoginHistory.create(count:1, user:user)
        if user.credits.nil?
          user.credits = Rails.configuration.x.win_for_reg
          flash[:notice] = "you got #{ fcredits Rails.configuration.x.win_for_reg } credits for sign up"
        end
        #user.credits += Rails.configuration.x.win_for_login
        #flash[:notice2] = "you got #{ fcredits Rails.configuration.x.win_for_login } credits for sign in"
        user.save!
      end

      # flash[:success] = "Welcome, #{user.name}!"
      game_url_after_login = session[:url_back]
      if game_url_after_login.present?
        redirect_to game_url_after_login
      else
        redirect_to user
      end
    # rescue
    #   flash[:warning] = "There was an error while trying to authenticate you..."
    # end
    # redirect_to root_path
  end
end
