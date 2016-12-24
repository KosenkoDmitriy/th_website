module Remind
  def self.daily
    messages = Message.daily
    score_list messages
  end

  def self.weekly
    messages = Message.weekly
    score_list messages
  end

  def self.monthly
    messages = Message.monthly
    score_list messages
  end

  private

  def self.score_list messages
    messages.where(is_published: true).each do |msg|
      User.where(is_subscribed: true).each do |user|
        # if msg.is_sms
        #   body_text = msg.title + "\n"
        #   body_text += msg.text + "\n"
        #   #TODO: will sent an sms
        # end
        # if msg.is_email
          UserMailer.notify_user(user, msg).deliver_now
        # end
      end
    end
  end

  def self.user_in_top10_of_all_games_for_cur_mo user

    @top = 10
    days_in_month = Time.days_in_month(Time.now.month, Time.now.year) #.months_ago(1).month)
    dt_utc = DateTime.now.utc #.months_ago(1) prev month
    @dt1 = DateTime.new(dt_utc.year, dt_utc.month, 1).strftime("%Y-%m-%d")
    @dt2 = DateTime.new(dt_utc.year, dt_utc.month, days_in_month).strftime("%Y-%m-%d")
    @time_range = @dt1..@dt2

    no = 0
    dict = []
    Game.order(:title).each do |game|
      no += 1
      list = {}
      ScoreHistory.find_by_sql("SELECT *, SUM(sc.amount) as sum, COUNT(u.id) as count_user FROM score_histories sc, users u, games g
       WHERE g.id = sc.game_id and u.id = sc.user_id AND g.id = #{game.try(:id)} AND sc.amount > 0 AND sc.created_at >= '#{@dt1}' AND sc.created_at <= '#{@dt2}'
    GROUP BY g.title, u.full_name ORDER BY g.title, sum DESC limit #{@top}
                               ").each do |score|
        if user.try(:display_name) == score.try(:user).try(:display_name)
          list[:no]=no
          list[:gtitle]=game.try(:title)
          list[:uname]="YOU"
          list[:uscores]=score.try(:sum)
          dict << list
        end
      end
    end

    no = 0
    dict2 = []
    Game.order(:title).each do |game|
      no+=1
      list = {}
      list[:no]=no
      list[:gtitle]=game.try(:title)
      list[:uname]="not YOU"
      list[:uscores]=user.score_history.where(game:game).sum(:amount) #ScoreHistory.where(user:user, game:game).sum(:amount)
      dict2 << list
    end

    dict2.each do |item2|
    dict.each do |item|
      if item[:no] == item2[:no]
        item2[:gtitle] = item[:gtitle]
        item2[:uname] = item[:uname]
        item2[:uscores] = item[:uscores]
      end
    end
    end

    return dict2
  end

  def self.unsubscribe
    u = User.find(1)
    u.update_columns(is_subscribed: false) # if u.is_subscribed
  end

  def self.subscribe
    u = User.find(1)
    u.update_columns(is_subscribed: true)
  end

end