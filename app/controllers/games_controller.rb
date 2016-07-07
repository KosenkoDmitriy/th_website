class GamesController < ApplicationController
  before_action :login_first, except: [:index, :show]

  def index
    @games = Game.all
  end

  def show
    id = params[:id]
    if id.to_i > 0
      @game = Game.find(id)
    else
      @game = Game.find_by(fid: id)
    end

    login_first if !@game.is_skipped_login?

  end

  def slot_ramses
    render :layout => "fullscreen"
  end

  private
  def login_first
    if !current_user
      url_back = request.fullpath
      session[:url_back] = url_back
      redirect_to sign_in_up_path
      return
    end
  end
end
