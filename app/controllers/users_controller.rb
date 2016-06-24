require 'digest/md5'

class UsersController < ApplicationController
  include SimpleCaptcha::ControllerHelpers

  protect_from_forgery except: [:login, :flogin, :sub, :add, :get_balance, :set_balance]
  skip_before_action :verify_authenticity_token

  before_action :allow_webgl, only: [:login, :flogin, :sub, :add, :get_balance, :set_balace]
  respond_to :html, :json

  def index
    redirect_to current_user
  end

  def show
    check_permissions
    @order = order_new

    @user = current_user
    @creditList = credits
  end

  def sign_in_up
    @user_empty = User.new
  end

  def signup
    email = params[:user][:email] if params[:user].present? && params[:user][:email].present?
    password = params['user']['password'] if params['user'].present? && params['user']['password'].present?
    confirm_password = params['user']['confirm_password'] if params['user'].present? && params['user']['confirm_password'].present?

    @user_empty = user = User.new(user_params)

    if !simple_captcha_valid?
      flash[:error] = t("simple_captcha.message.user")
      redirect_to sign_in_up_path() # redirect_to :back
      # render template: "users/sign_in_up", locals: {user_empty: @user_empty}
      return
    end

    if email.blank? || password.blank?
      flash[:error] = "please enter email and/or password"
      redirect_to sign_in_up_path() # redirect_to :back
      return
    end

    if (confirm_password != password)
      flash[:error] = "passwords didn't match"
      redirect_to sign_in_up_path() # redirect_to :back
      # render ""
      return
    end

    if User.exists?(email: email)
      flash[:error] = "email already taken: #{ email }"
      redirect_to sign_in_up_path() # redirect_to :back
      return
    end

    user.password = pass(password)
    user.confirm_password = ''
    user.credits = Rails.configuration.x.win_for_reg

    # if !user.valid?
    #   user.errors.each do |error|
    #     flash[:error2] += error + '\n'
    #     return
    #   end
    # end

    if user.save
      session[:user_id] = user.try(:id) # signup and signin
      flash[:notice] = "registered successfully!"
      flash[:notice2] = "you got #{ fcredits Rails.configuration.x.win_for_reg } credits for sign up"
      redirect_to user
    else
      flash[:error] = "error: can\' t create user #{ user.email }"
      redirect_to sign_in_up_path() # redirect_to :back
      return
    end
  end

  def signin
    email = params['user']['email'] if params['user'].present? && params['user']['email'].present?
    password = params['user']['password'] if params['user'].present? && params['user']['password'].present?
    @user_empty = User.new(user_params)
    if !simple_captcha_valid?
      flash[:error] = t("simple_captcha.message.user")
      # render template: "users/sign_in_up", locals: {user_empty: @user_empty}
      redirect_to sign_in_up_path() # redirect_to :back
      return
    end
    if email.present? && password.present?
      password = pass(password)
      if User.exists?(email: email, password: password)
        user = User.find_by(email: email, password: password)
        if user
          session[:user_id] = user.try(:id)
          if (user.last_login_dt.present? && user.last_login_dt <= DateTime.now - 1) || user.last_login_dt.blank? # yesterday login or first login
            flash[:notice2] = "you got #{ fcredits Rails.configuration.x.win_for_login } credits for sign in"
            user.update_column(:last_login_dt, DateTime.now)
            user.credits += Rails.configuration.x.win_for_login
          end
          if user.save
            redirect_to user
            return
          else
            flash[:error] = 'can not update user info'
          end
        else
          flash[:error] = 'please signup/register'
        end
      else
        flash[:error] = 'please signup/register'
      end
    else
      flash[:error] = 'empty email and/or password'
    end
    redirect_to sign_in_up_path() # redirect_to :back
    return
  end

  def signout
    session[:user_id] = nil
    # flash[:success] = 'See you!'
    redirect_to root_path
  end

  def restore

  end


  # login from game
  def login
    email = params['e'] if params['e'].present?
    password = params['p'] if params['p'].present?
    password = pass(password)
    if User.exists?(email: email, password: password)
      user = User.find_by(email: email, password: password)
      user.key = generate_key(email, password)
      if (user.save!)
        render plain: "#{user.key}", status: 200
        return
      end
      #render plain: "#{user.key} #{user.email} #{user.phone_number}", status: 200
      render plain 'error key', status: 404
      return
    end
    render plain: 'please signup/register', status: 404
  end

  # facebook login
  def flogin
    uid = params['u'] if params['u'].present?
    provider = params['p'] if params['p'].present?
    if User.exists?(bt: uid, provider: provider)
      user = User.find_by(bt: uid, provider: provider)
      user.key = generate_key(user.email, user.password)
      if (user.save!)
        render plain: "#{user.key}", status: 200
        return
      end
      #render plain: "#{user.key} #{user.email} #{user.phone_number}", status: 200
      render plain 'error key', status: 404
      return
    end
    render plain: 'please login/sign in on website first', status: 404
  end


  # sub lose amount from balance
  def sub
    user, credits_from_param = get_user params
    if user.present?
      user.credits -= credits_from_param
      if user.save!
        render plain: 'ok', status: 200
        return
      end
    end
    render plain: 'error', status: 404
  end

  # add win amount to balance
  def add
    user, credits_from_param = get_user params
    if user.present?
      user.credits += credits_from_param
      if user.save!
        render plain: 'ok', status: 200
        return
      end
    end
    render plain: 'error', status: 404
  end

  def set_balance
    user, credits_from_param = get_user params
    if user.present?
      user.credits = credits_from_param
      if user.save!
        render plain: 'ok', status: 200
        return
      end
    end
    render plain: 'error', status: 404
  end

  # get balance
  def get_balance
    user, credits_from_param = get_user params
    if user.present?
      render plain: "#{user.credits}", status: 200
      return
    end
    render plain: 'error', status: 404
  end

  def fw
    user_id = params[:user_id].to_i if params[:user_id].present?
    win_amount = params[:win_amount].to_i if params[:win_amount].present?
    if user_id > 0
      user = current_user
      if win_amount > 0
        user.credits += win_amount
      else # bankrupt
        user.credits = 0
      end
      if user.save
        # redirect_to user_path(user)
        render plain: "#{user.credits}", status: 200
        return
      end
    end
    render plain: "error", status: 404
  end

  private

  def get_user params
    credits = params['a'] if params['a'].present?
    key = params['k'] if params['k'].present?
    if User.exists?(key: key)
      user = User.find_by(key: key)
      return user, credits.to_f
    end
    return nil
  end

  def generate_key email, password
    prng = Random.new()
    salt = prng.rand(100..1000)
    key = Digest::MD5.hexdigest("#{salt}#{email}#{password}")
    return key
  end

  def pass pass
    return nil if pass.blank?
    pass = Digest::MD5.hexdigest(pass)
    return pass
  end

  def allow_webgl
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
