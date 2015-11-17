require 'digest/md5'

class UsersController < ApplicationController
  respond_to :html, :json

  def signup
    user = User.new(user_params)
    password = params['user']['password'] if params['user'].present? && params['user']['password'].present?
    user.password = Digest::MD5.hexdigest(password)
    if user.save!
      # respond_with user
      render plain: "registered successfully! your email: #{ user.email }"
    else
      render plain: "error: can't create user #{ user.email }"
    end
  end

  def signin
    email = params['user']['email'] if params['user'].present? && params['user']['email'].present?
    password = params['user']['password'] if params['user'].present? && params['user']['password'].present?
    if email.present? && password.present?
      password = Digest::MD5.hexdigest(password)
      if User.exists?(email: email, password: password)
        user = User.find_by(email: email, password: password)
        render plain: "#{user.email} #{user.phone_number}"
      else
        render plain: "please signup/register"
      end
    else
      render plain: "empty email"
    end
  end

  def restore

  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :confirm_password, :full_name, :credits, :phone_number)
  end
end
