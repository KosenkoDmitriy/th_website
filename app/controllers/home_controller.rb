class HomeController < ApplicationController

  def index
    @creditList = credits
    @games = Game.all
  end

  def show

  end

  def fw10

  end
  private
end
