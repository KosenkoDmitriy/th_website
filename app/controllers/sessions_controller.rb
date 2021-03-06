class SessionsController < ApplicationController
  def create
    # render text: request.env['omniauth.auth'].to_json #.to_yaml
    # begin
      user = User.from_omniauth(request.env['omniauth.auth'], session[:k])

      if !user.present?
        flash[:error] = t("user.empty")
        redirect_to sign_in_path and return
      end

      if !user.is_active?
        flash[:error] = t("user.blocked")
        redirect_to sign_in_path and return
      end

      user.key = ApplicationHelper.gk(user.email, user.password) if session[:is_mobile]

      if (user.last_login_dt.present? && user.last_login_dt <= DateTime.now - 1) || user.last_login_dt.blank? # yesterday login or first login
        user.last_login_dt = DateTime.now #user.update_column(:last_login_dt, DateTime.now)
        if user.credits.nil?
          user.credits = Rails.configuration.x.win_for_reg
          flash[:notice] = "you got #{ fcredits Rails.configuration.x.win_for_reg } credits for sign up"
        end
        #user.credits += Rails.configuration.x.win_for_login
        #flash[:notice2] = "you got #{ fcredits Rails.configuration.x.win_for_login } credits for sign in"
        user.save!
        msg = Message.new
        msg.title = Rails.configuration.x.signup_thanks_title
        msg.text = Rails.configuration.x.signup_thanks_text
        UserMailer.notify_user(user, msg).deliver_now
        LoginHistory.create(count:1, user:user)
      end

      session[:user_id] = user.try(:id)

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
