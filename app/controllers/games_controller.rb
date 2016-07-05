class GamesController < ApplicationController
  before_action :save_url, except: [:index, :show]

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
  end

  def slot_ramses
    render :layout => "fullscreen"
  end

  # def video_poker_jack
    # prepend_view_path "public/video_poker_jack/"
    # render layout: "fullscreen", template: "index.html"
  # end

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
