class GamesController < ApplicationController
  before_action :save_url, except: [:index, :show]

  def index
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
  end

  def slot_ramses
    render :layout => "fullscreen"
  end

  private
  def save_url
    if !current_user
      url_back = request.fullpath
      session[:url_back] = url_back
      redirect_to sign_in_up_path
      return
    end
  end
end
