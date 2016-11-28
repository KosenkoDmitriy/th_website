class GamesController < ApplicationController
  include ApplicationHelper

  before_action :login_first, except: [:index, :show, :scores]

  def index
    @games = Game.all
  end

  def scores

  end

  def show
    @games = Game.last(6).reverse
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

    !@game.is_skipped_login? ? login_first : counter

  end

  private
  def counter
    @game.counter += 1
    @game.save
  end

  def login_first
    if !current_user
      url_back = request.fullpath
      session[:url_back] = url_back
      redirect_to sign_in_up_path
      return
    else
      counter
      # if @game.is_embedded != false
      #   url = current_user && current_user.provider == "facebook" ? @game.fb_url : @game.url
      #   redirect_to url
      #   return
      # end

      if @game.fid == "lol" || @game.fid == "angry_finches" || @game.fid == "candy_super_lines" || @game.fid == "freecell_solitaire" || @game.fid == "spider_solitaire" || @game.fid == "slot_soccer"
        if current_user
          current_user.credits -= Rails.configuration.x.non_casino_game_fee
          current_user.save
        end
      end

      redirect_to @game.try(:url) and return if @game.fid == "candy_super_lines" and is_mobile == true
      #redirect_to @game.fb_url and return if current_user && current_user.provider == "facebook" && @game.fb_url.present?
    end
  end
end
