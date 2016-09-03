class HomeController < ApplicationController

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
    text = params['text']
    email_from = params['email']
    if text.present? && email_from.present?
      title = "YourPlaceForFun. Request from " + email_from
      email_to = Rails.configuration.x.email_to
      if UserMailer.notify_me(email_to, title, text).deliver
        flash[:notice] = "Success! Your message was sent!"
      else
        flash[:notice] = "Error! Your message was not sent. Please try again later."
      end
    end
  end

  private
end
