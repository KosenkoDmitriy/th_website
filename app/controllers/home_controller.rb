class HomeController < ApplicationController

  def index
    @user = User.new
    @creditList = credits
  end

  def show

  end

  private
end
