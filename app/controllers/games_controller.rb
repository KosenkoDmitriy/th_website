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

    @top_list = get_top_list current_user, @game
    !@game.is_skipped_login? ? login_first : counter

  end

  private

  def get_top_list user, game

    @top = 10
    days_in_month = Time.days_in_month(Time.now.month, Time.now.year) #.months_ago(1).month)
    dt_utc = DateTime.now.utc #.months_ago(1) prev month
    @dt1 = DateTime.new(dt_utc.year, dt_utc.month, 1).strftime("%Y-%m-%d")
    @dt2 = DateTime.new(dt_utc.year, dt_utc.month, days_in_month).strftime("%Y-%m-%d")
    @time_range = @dt1..@dt2

    no = 0
    dict = []

    sql="SELECT *, SUM(sc.amount) as sum, COUNT(u.id) as count_user FROM score_histories sc, users u, games g
       WHERE g.id = sc.game_id and u.id = sc.user_id AND g.id = #{game.try(:id)} AND sc.amount > 0 AND sc.created_at >= '#{@dt1}' AND sc.created_at <= '#{@dt2}'
       GROUP BY u.full_name
       ORDER BY sum DESC "; #limit #{@top}";
    ScoreHistory.find_by_sql(sql).each do |score|
      no += 1
      if no <= @top
        list = {}
        list[:no] = no
        # list[:gtitle]=game.try(:title)
        list[:uname] = user.try(:display_name) == score.try(:user).try(:display_name) ? "YOU" : score.try(:user).try(:display_name)
        #list[:uname] = score.try(:user).try(:display_name)
        list[:uscores] = score.try(:sum)
        dict << list
      else
        if user.try(:display_name) == score.try(:user).try(:display_name)
          dict << {no:".", uname:"", uscores:""}

          list = {}
          list[:no] = no
          # list[:gtitle]=game.try(:title)
          list[:uname] = " *** YOU *** " # score.try(:user).try(:display_name)
          list[:uscores] = score.try(:sum)
          dict << list

          dict << {no:".", uname:"", uscores:""}

          # count = ScoreHistory.find_by_sql(sql).count
          # dict << {no:count, uname:"", uscores:""} if count > no

          return dict

        end
      end

    end

    return dict
  end

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
