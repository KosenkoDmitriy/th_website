class HomeController < ApplicationController

  def index
    @user_empty = User.new
    @creditList = credits
  end

  def show

  end

  private
end
