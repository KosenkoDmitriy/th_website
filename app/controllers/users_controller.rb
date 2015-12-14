require 'digest/md5'

class UsersController < ApplicationController

  protect_from_forgery except: [:login, :sub, :add, :get_balance, :set_balance]
  skip_before_action :verify_authenticity_token

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

  def signup
    email = params[:user][:email] if params[:user].present? && params[:user][:email].present?
    password = params['user']['password'] if params['user'].present? && params['user']['password'].present?
    confirm_password = params['user']['confirm_password'] if params['user'].present? && params['user']['confirm_password'].present?

    @user = User.new(user_params)

    if email.blank? || password.blank?
      flash[:error] = "please enter email and/or password"
      # redirect_to :back
      return
    end

    if (confirm_password != password)
      flash[:error] = "passwords didn't match"
      # redirect_to :back
      # render ""
      return
    end

    if User.exists?(email: email)
      flash[:error] = "email already taken: #{ email }"
      # redirect_to :back
      return
    end

    @user.password = pass(password)
    @user.confirm_password = ''
    @user.credits = Rails.configuration.x.win_for_reg

    # if !@user.valid?
    #   @user.errors.each do |error|
    #     flash[:error2] += error + '\n'
    #     return
    #   end
    # end

    if @user.save
      flash[:notice] = "registered successfully! your email: #{ @user.email }"
      redirect_to @user
    else
      flash[:error] = "error: can\' t create user #{ @user.email }"
      # redirect_to :back
      # return
    end
  end

  def signin
    email = params['user']['email'] if params['user'].present? && params['user']['email'].present?
    password = params['user']['password'] if params['user'].present? && params['user']['password'].present?
    @user = User.new
    if email.present? && password.present?
      password = pass(password)
      if User.exists?(email: email, password: password)
        @user = User.find_by(email: email, password: password)
        if @user
          session[:user_id] = @user.try(:id)
          if @user.last_login_dt.blank? # first login
            @user.last_login_dt = DateTime.now
            @user.credits += Rails.configuration.x.win_for_login
          end
          @user.credits += Rails.configuration.x.win_for_login if @user.last_login_dt.day < Date.today.day
          if @user.save
            flash[:notice] = "you got #{Rails.configuration.x.win_for_login} credits for login"
          end
          redirect_to @user
        else
          flash[:error] = 'please signup/register'
        end
      else
        flash[:error] = 'please signup/register'
      end
    else
      flash[:error] = 'empty email and/or password'
    end
  end

  def signout
    session[:user_id] = nil
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

  def user_params
    params.require(:user).permit(:email, :password, :confirm_password, :full_name, :credits, :phone_number)
  end

end
