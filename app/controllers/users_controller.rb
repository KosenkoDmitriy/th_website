class UsersController < ApplicationController
  include SimpleCaptcha::ControllerHelpers

  protect_from_forgery except: [:fw_th, :login, :flogin, :sub, :add, :get_balance, :set_balance, :unsubscribe]
  skip_before_action :verify_authenticity_token

  before_action :allow_webgl, only: [:fw_th, :login, :flogin, :sub, :add, :get_balance, :set_balace, :unsubscribe]
  respond_to :html, :json

  def index
    redirect_to current_user
  end

  def invites
    @users = User.where(key_invite:current_user.id) #, created_at:current_user.last_login_dt..DateTime.now)
  end

  def unsubscribe
    key = params["k"] if params["k"].present?
    if key.present? && User.exists?(password: key)
      user = User.find_by(password: key)
      if user.update_column(:is_subscribed, false)
        flash[:msg] = "You have unsubscribed successfully"
      end
    else
      flash[:msg] = "user not found"
      return
    end
  end

  def show
    check_permissions
    @order = order_new
    @games = Game.all
    @user = current_user
    @creditList = credits

    session[:k] = nil if session[:k] # invintation key

    if session[:is_mobile]
      session[:is_mobile] = nil
      @user_empty = User.new
      render layout: 'mobile', template: 'uniwebview/close' and return
    end

  end

  def mobile_signup
    @user_empty = User.new
    session[:is_mobile] = true
    # redirect_to current_user and return if current_user
    render layout: 'mobile', template: 'mobile/signup'
  end

  def sign_up
    session[:is_mobile] = nil
    session[:k] = params['k'] if params['k'].present?
    @user_empty = User.new
    @user_empty = User.new flash[:user] if flash[:user]
    redirect_to user_path current_user if current_user
  end

  def sign_in
    session[:is_mobile] = nil
    session[:k] = params['k'] if params['k'].present?
    @user_empty = User.new
    @user_empty = User.new flash[:user] if flash[:user]
    redirect_to user_path current_user if current_user
  end

  def signup
    email = params[:user][:email].downcase if params[:user].present? && params[:user][:email].present?
    password = params['user']['password'] if params['user'].present? && params['user']['password'].present?
    confirm_password = params['user']['confirm_password'] if params['user'].present? && params['user']['confirm_password'].present?

    @user_empty = user = User.new(user_params)

    flash[:user] = @user_empty
    if !simple_captcha_valid?
      flash[:error] = t("simple_captcha.message.user")
      redirect_back_or_sign_up
      # render template: "users/sign_up", locals: {user_empty: @user_empty}
      return
    end

    if email.blank? || password.blank?
      flash[:error] = "please enter email and/or password"
      redirect_back_or_sign_up
      return
    end

    if (confirm_password != password)
      flash[:error] = "passwords didn't match"
      redirect_back_or_sign_up
      # render ""
      return
    end

    if User.exists?(email: email)
      flash[:error] = "email already taken: #{ email }"
      redirect_back_or_sign_up
      return
    end

    user.password = UsersHelper.pwd(password)
    user.confirm_password = ''
    user.last_login_dt = DateTime.now
    user.credits = Rails.configuration.x.win_for_reg

    user.generate_key_invite email, session[:k] # invite friends for non facebook (email) users

    # if !user.valid?
    #   user.errors.each do |error|
    #     flash[:error2] += error + '\n'
    #     return
    #   end
    # end

    user.key = ApplicationHelper.gk(user.email, user.password) if session[:is_mobile]

    if user.save
      session[:user_id] = user.try(:id) # signup and signin
      flash[:notice] = "registered successfully!"
      flash[:notice2] = "you got #{ fcredits Rails.configuration.x.win_for_reg } credits for sign up"
      msg = Message.new
      msg.title = Rails.configuration.x.signup_thanks_title
      msg.text = Rails.configuration.x.signup_thanks_text
      UserMailer.notify_user(user, msg).deliver_now
      redirect_to user
    else
      flash[:error] = "error: can\' t create user #{ user.email }"
      redirect_back_or_sign_up
      return
    end
  end

  def redirect_back_or_sign_up(default = sign_up_path, options = {})
    redirect_to (request.referer.present? ? :back : default), options
  end

  def redirect_back_or_sign_in(default = sign_in_path, options = {})
    redirect_to (request.referer.present? ? :back : default), options
  end

  def signin
    email = params['user']['email'] if params['user'].present? && params['user']['email'].present?
    password = params['user']['password'] if params['user'].present? && params['user']['password'].present?
    @user_empty = User.new(user_params)
    flash[:user] = @user_empty
    # if !simple_captcha_valid?
    #   flash[:error] = t("simple_captcha.message.user")
    #   # render template: "users/sign_in", locals: {user_empty: @user_empty}
    #   redirect_back_or_sign_in
    #   return
    # end
    if email.present? && password.present?
      password = UsersHelper.pwd(password)
      if User.exists?(email: email)
        user = User.find_by(email: email)
        if user.password == password
          if !user.is_active?
            flash[:error] = t("user.blocked")
            redirect_back_or_sign_in and return
          end
          session[:user_id] = user.try(:id)
          if (user.last_login_dt.present? && user.last_login_dt <= DateTime.now - 1) || user.last_login_dt.blank? # yesterday login or first login
            #flash[:notice2] = "you got #{ fcredits Rails.configuration.x.win_for_login } credits for sign in"
            user.update_column(:last_login_dt, DateTime.now)
            #user.credits += Rails.configuration.x.win_for_login
            LoginHistory.create(count:1, user:user)
          end

          user.key = ApplicationHelper.gk(user.email, user.password) if session[:is_mobile]

          if user.save
            game_url_after_login = session[:url_back]
            if game_url_after_login.present?
              redirect_to game_url_after_login
            else
              redirect_to user
            end

            return
          else
            flash[:error] = 'can not update user info'
          end
        else
          flash[:error] = 'incorrect password'
        end
      else
        flash[:error] = 'please signup/register'
      end
    else
      flash[:error] = 'empty email and/or password'
    end

    redirect_back_or_sign_in
    return
  end

  def signout
    session[:user_id] = nil
    session[:is_mobile] = nil
    session[:url_back] = nil
    session[:k] = nil # invintation key

    # flash[:success] = 'See you!'
    redirect_to root_path
  end

  def restore

    if !simple_captcha_valid?
      flash[:error] = t("simple_captcha.message.user")
      return
    end

    step = params['step'].to_i
    if step == 1 # sent activation code

      email = params['email'] if params['email'].present?
      flash[:error] = "empty email" and return if email.blank?

      if User.exists?(email: email)
        user = User.find_by(email: email)
      else
        flash[:error] = "user not found"
        return
      end

      email_with_name = %("#{user.try(:full_name)}" <#{email}>)
      acode = "#{rand(0..9)}#{rand(0..9)}#{rand(0..9)}#{rand(0..9)}"
      user.update_columns(acode: acode)
      if UserMailer.notify_me(email_with_name, "Restore Password. YourPlaceForFun.Com", "Confirmation code: #{acode}").deliver_now
        flash[:error] = "Success! Confirmation code was sent to your email!"
      else
        flash[:error] = "Error! Confirmation code was not sent. Please try again later."
      end
    elsif step == 2 # reset password confirmation
      new_pass = params['password'] if params['password'].present?
      pass = params['password2'] if params['password2'].present?
      @acode = params['acode'] if params['acode'].present?

      flash[:error] = "empty password" and return if new_pass.blank?
      flash[:error] = "empty confirmation code" and return if @acode.blank?
      flash[:error] = "passwords didn't match" if pass != new_pass

      if User.exists?(acode: @acode)
        user = User.find_by(acode: @acode)
        user.update_columns(password: UsersHelper.pwd(new_pass), acode: "")
        redirect_to sign_in_path
      else
        flash[:error] = "invalid confirmation code"
        return
      end
    end
  end


  # email login from game
  def login
    email = params['e'] if params['e'].present?
    password = params['p'] if params['p'].present?
    reg_info = params['r'] if params['r'].present?
    platform = params['t'] if params['t'].present?

    if email.blank? || password.blank?
      render plain: 'please enter your credentials', status: 404
      return
    end

    user = nil
    bt = password
    password = UsersHelper.pwd(password)
    if User.exists?(email: email, password: password)
      user = User.find_by(email: email, password: password)
    elsif User.exists?(bt: bt) && bt.present? # quick fix for lol game (social login)
      user = User.find_by(bt: bt)
    end

    if user.present?
      render plain: t("user.blocked"), status: 404 and return if !user.is_active?

      ThLoginHistory.create(user_id:user.try(:id), platform:platform) if platform.present?

      user.key = ApplicationHelper.gk(email, password)
      if user.save!
        if reg_info
          render json: user.to_json( only: [:full_name, :email, :key ] ), status: 200
        else
          render plain: "#{user.key}", status: 200
        end
        return
      end
      #render plain: "#{user.key} #{user.email} #{user.phone_number}", status: 200
      render plain: 'error key', status: 404
      return
    end
    render plain: 'please signup/register', status: 404
  end

  # facebook login from game
  def flogin
    uid = params['u'] if params['u'].present?
    provider = params['p'] if params['p'].present?
    reg_info = params['r'] if params['r'].present?
    platform = params['t'] if params['t'].present?

    if User.exists?(bt: uid, provider: provider)
      user = User.find_by(bt: uid, provider: provider)

      ThLoginHistory.create(user_id:user.try(:id), platform:platform) if platform.present?

      render plain: t("user.blocked"), status: 404 and return if !user.is_active?

      user.key = ApplicationHelper.gk(user.email, user.password)
      if user.save!
        if reg_info
          render json: user.to_json( only: [:full_name, :email, :key ] ), status: 200
        else
          render plain: "#{user.key}", status: 200
        end
        return
      end
      #render plain: "#{user.key} #{user.email} #{user.phone_number}", status: 200
      render plain: 'error key', status: 404
      return
    end
    render plain: 'please login/sign in on website first', status: 404
  end


  # sub lose amount from balance
  def sub
    user, credits_from_param = get_user_by_key params
    if user.present?
      credits_from_param *= -1 if credits_from_param < 0

      user.credits -= credits_from_param
      new_score_history user, -credits_from_param

      if user.save!
        render plain: user.credits, status: 200
        return
      end
    end
    render plain: 'error', status: 404
  end

  # add win amount to balance
  def add
    user, credits_from_param = get_user_by_key params
    if user.present?
      credits_from_param *= -1 if credits_from_param < 0

      user.credits += credits_from_param
      new_score_history user, credits_from_param

      if user.save!
        render plain: user.credits, status: 200
        return
      end
    end
    render plain: 'error', status: 404
  end

  def set_balance
    user, credits_from_param = get_user_by_key params

    if user.present?
      dt = credits_from_param - user.credits
      new_score_history user, dt

      user.credits = credits_from_param
      if user.save!
        render plain: 'ok', status: 200
        return
      end
    end
    render plain: 'error', status: 404
  end

  def avatar_url
    if current_user.present?
      render plain: "#{current_user.try(:image_url)}", status: 200
      return
    end
    render plain: 'error', status: 404
  end

  # get balance
  def get_balance
    user, credits_from_param = get_user_by_key params
    if user.present?
      render plain: "#{user.credits}", status: 200
      return
    end
    render plain: 'error', status: 404
  end


  # sub lose amount from balance
  def sub2
    user, credits_from_param = get_user2
    if user.present?
      credits_from_param *= -1 if credits_from_param < 0
      user.credits -= credits_from_param
      new_score_history user, -credits_from_param

      if user.save!
        #render plain: 'ok', status: 200
        render plain: user.credits, status:200
	return
      end
    end
    render plain: 'error', status: 404
  end

  # add win amount to balance
  def add2
    user, credits_from_param = get_user2
    credits_from_param *= -1 if credits_from_param < 0
    new_score_history user, credits_from_param

    if user.present?
      user.credits += credits_from_param
      if user.save!
        #render plain: 'ok', status: 200
        render plain: user.credits, status:200
	return
      end
    end
    render plain: 'error', status: 404
  end

  # set balance by user id from session
  def set_balance2
    user, credits_from_param = get_user2
    if user.present?
      dt = credits_from_param - user.credits
      new_score_history user, dt

      user.credits = credits_from_param
      if user.save!
        render plain: 'ok', status: 200
        return
      end
    end
    render plain: 'error', status: 404
  end

  # get balance by user id from session
  def get_balance2
    user, credits_from_param = get_user2
    # render plain: 'error', status: 404 if user.nil?
    p=params['f'] if params['f'].present?
    if p.to_i > 0
      render plain: "#{fcredits(user.credits)}", status: 200
      return
    end
    if user.present?
      render plain: "#{user.credits}", status: 200
      return
    end
    render plain: 'error', status: 404
  end

  def new_score_history user, amount
    fid = request.referrer.split('/')[-2] if request.referrer.present?

    # check for mobile app
    tfid = params["id"] if params["id"].present?
    fid = "texas_holdem_foldup" if tfid == "th"
    # end check for mobile app

    if Game.exists?(fid:fid) && amount != 0
      game = Game.find_by(fid:fid)
      ScoreHistory.create(amount:amount, user:user, game:game)
    end
  end

  def get_reg
    key = params['k'] if params['k'].present?
    if key.present? && User.exists?(key: key)
      user = User.find_by(key: key)
      render plain: "#{user.full_name}", status: 200
      return
    end
    render plain: 'error', status: 404
  end

  def fw # of website
    user_id = params[:user_id].to_i if params[:user_id].present?
    win_amount = params[:win_amount].to_i if params[:win_amount].present?
    if user_id > 0 && current_user.present?
      #current_user = User.find(session[:user_id]) if session[:user_id]
      current_user.fw_attempts -= 1
      current_user.fw_dt = DateTime.now if current_user.fw_dt.nil?

      if current_user.fw_attempts >= 0
        current_user.credits += win_amount
        current_user.fw_dt = DateTime.now.utc + 1 if current_user.fw_attempts == 0
        render plain: fcredits(current_user.credits), status: 200
      elsif current_user.fw_attempts < 0 # daily limit has been exceeded
        t2 = Time.parse(current_user.fw_dt.utc.to_s)
        t_now = Time.now.utc
        dt_in_minutes = t2.min - t_now.min
        t = ((t2 - t_now) / 3600).round
        dt = ''
        if t == 0 # dt in minutes
          dt += "#{dt_in_minutes} minute"
          dt += 's' if dt_in_minutes > 1
        else      # dt in hours
          dt = "#{t} hours"
        end

        d2 = current_user.fw_dt.utc
        d_now = DateTime.now.utc
        #if t <= 0
        if d2 < d_now # checking dt without relogin
          current_user.fw_attempts = Rails.configuration.x.fw_attempts - 1
          current_user.fw_dt = DateTime.now.utc + 1 if current_user.fw_attempts == 0
          current_user.credits += win_amount
          render plain: fcredits(current_user.credits), status: 200
        else
          render plain: "#{t("user.fw.exceed")} #{ dt } ", status: 404
        end
      end
      FwHistory.create(amount:win_amount, user:current_user, is_mobile:false) if current_user.save
      #FwHistory.create(amount:win_amount, user:current_user, is_mobile:false, source:request.env['HTTP_USER_AGENT']) if current_user.save
      return

    end
    render plain: "error", status: 404
  end

  def fw_th # of mobile game

    user, win_amount = get_user_by_key params
    if user.present?
      #user.credits += win_amount
      #new_score_history user, win_amount

      user.fw_attempts -= 1
      user.fw_dt = DateTime.now if user.fw_dt.nil?

      if user.fw_attempts >= 0
        user.credits += win_amount
        user.fw_dt = DateTime.now.utc + 1 if user.fw_attempts == 0
        #render plain: fcredits(user.credits), status: 200
        render plain: win_amount, status: 200
      elsif user.fw_attempts < 0 # daily limit has been exceeded
        t2 = Time.parse(user.fw_dt.utc.to_s)
        t_now = Time.now.utc
        dt_in_minutes = t2.min - t_now.min
        t = ((t2 - t_now) / 3600).round
        dt = ''
        if t == 0 # dt in minutes
          dt += "#{dt_in_minutes} minute"
          dt += 's' if dt_in_minutes > 1
        else      # dt in hours
          dt = "#{t} hours"
        end

        d2 = user.fw_dt.utc
        d_now = DateTime.now.utc
        #if t <= 0
        if d2 < d_now # checking dt without relogin
          user.fw_attempts = Rails.configuration.x.fw_attempts - 1
          user.fw_dt = DateTime.now.utc + 1 if user.fw_attempts == 0
          user.credits += win_amount
          #render plain: fcredits(user.credits), status: 200
          render plain: win_amount, status: 200
        else
          render plain: "#{t("user.fw.exceed")} #{ dt } ", status: 404
        end
      end
      FwHistory.create(amount:win_amount, user:user, is_mobile:true) if user.save
      #FwHistory.create(amount:win_amount, user:user, is_mobile:true, source:request.env['HTTP_USER_AGENT']) if user.save
      return

    end
    render plain: "please try again later", status: 404
  end


  private

  def get_user_by_key params
    credits = params['a'] if params['a'].present?
    key = params['k'] if params['k'].present?
    if key.present? && User.exists?(key: key)
      user = User.find_by(key: key)
      return user, credits.to_f
    end
  end

  def get_user2
    user = current_user # user = @current_user
    credits = params['a'] if params['a'].present?
    return user, credits.to_f
  end

  def allow_webgl
    # headers["Access-Control-Allow-Credentials"] = "true"
    # headers["Access-Control-Allow-Headers"] = "Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time"
    # headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    # headers["Access-Control-Allow-Origin"] = "*"

    header_orig = request.headers['Origin']
    host = Rails.configuration.x.api.host
    if header_orig.present? && host.present? && header_orig.include?(host)
    # if /\Ahttps?:\/\/localhost:8000\z/ =~ request.headers['Origin']
      headers['Access-Control-Allow-Origin'] = request.headers['Origin']
      # headers['Access-Control-Request-Method'] = %w{GET POST OPTIONS}.join(",")
      # # Change this to something smaller while you are debugging
      # headers['Access-Control-Max-Age']       = "1728000"
      # # Change this to the list of accepted headers, or remove it if you do not accept any.
      # headers['Access-Control-Allow-Headers'] = request.headers['Access-Control-Request-Headers']
    end
  end

  def user_params
    return if params[:user].blank?
    params.require(:user).permit(:email, :password, :confirm_password, :full_name, :credits, :phone_number, :captcha, :captcha_key)
  end

end
