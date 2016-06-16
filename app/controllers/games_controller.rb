class GamesController < ApplicationController
  def index
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
  end

  def slot_ramses
    render :layout => "fullscreen"
  end
end
