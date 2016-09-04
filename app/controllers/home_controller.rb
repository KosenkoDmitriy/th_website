class HomeController < ApplicationController
  include SimpleCaptcha::ControllerHelpers

  def index
    @order = order_new
    @user_empty = User.new
    @creditList = credits
    @games = Game.all
  end

  def show

  end

  def fw10

  end

  def contact_us
    @email_from = current_user.try(:email) if current_user
    @text = params['text']
    @email_from = params['email']

    if !simple_captcha_valid?
      flash[:error] = t("simple_captcha.message.user")
      #redirect_to contact_us_get_path
      return
    end


    if @text.present? && @email_from.present?
      @title = "YourPlaceForFun. Request from " + @email_from
      email_to = Rails.configuration.x.email_to
      UserMailer.notify_me(email_to, @title, @text).deliver_now
      # if UserMailer.notify_me(email_to, title, text).deliver
      #   flash[:notice] = "Success! Your message was sent!"
      # else
      #   flash[:notice] = "Error! Your message was not sent. Please try again later."
      # end
    end
  end

  private
end
