class HomeController < ApplicationController

  def index
    @user_empty = User.new
    @creditList = credits
    @games = Game.all
  end

  def show
    game = Game.find_by(fid: 'texas_holdem_foldup')
    game.counter += 1
    game.save
  end

  def fw10

  end
  private
end
