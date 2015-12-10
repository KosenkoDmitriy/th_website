require 'digest/md5'

class UsersController < ApplicationController
  protect_from_forgery except: [:login, :sub, :add, :get]
  skip_before_action :verify_authenticity_token

  respond_to :html, :json

  def signup
    user = User.new(user_params)
    password = params['user']['password'] if params['user'].present? && params['user']['password'].present?
    user.password = pass(password)
    if user.save!
      # respond_with user
      render plain: "registered successfully! your email: #{ user.email }"
    else
      render plain: "error: can\' t create user #{ user.email }"
    end
  end

  def signin
    email = params['user']['email'] if params['user'].present? && params['user']['email'].present?
    password = params['user']['password'] if params['user'].present? && params['user']['password'].present?
    if email.present? && password.present?
      password = pass(password)
      if User.exists?(email: email, password: password)
        user = User.find_by(email: email, password: password)
        render plain: "#{user.email} #{user.phone_number}"
      else
        render plain: 'please signup/register'
      end
    else
      render plain: 'empty email'
    end
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
    pass = Digest::MD5.hexdigest(pass)
    return pass
  end

  def user_params
    params.require(:user).permit(:email, :password, :confirm_password, :full_name, :credits, :phone_number)
  end

end
