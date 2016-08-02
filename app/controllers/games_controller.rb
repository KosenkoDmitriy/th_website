class GamesController < ApplicationController
  before_action :login_first, except: [:index, :show]

  def index
    @games = Game.all
  end

  def show
    id = params[:id]
    if id.to_i > 0
      if Game.exists?(id)
        @game = Game.find(id)
      else
        redirect_to games_path and return
      end
    else
      @game = Game.find_by(fid: id)
    end

    login_first if !@game.is_skipped_login?
  end

  private
  def login_first
    if !current_user
      url_back = request.fullpath
      session[:url_back] = url_back
      redirect_to sign_in_up_path
      return
    else
      if @game.is_embedded == false
        url = current_user && current_user.provider == "facebook" ? @game.fb_url : @game.url
        redirect_to url
        return
      end
    end
  end
end
