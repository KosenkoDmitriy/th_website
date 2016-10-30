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
    # TODO:
    # include text (free credits: login & fw)
    # prize:
    # if in top of all games - display you 12 times
    # every day login
    # high score in all games or in top 10 of each game

    messages.where(is_published: true).each do |msg|
      User.where(is_subscribed: true).each do |user|
        if msg.is_sms
          body_text = msg.title + "\n"
          body_text += msg.text + "\n"
          #TODO: will sent an sms
        end
        if msg.is_email
          body_text = msg.text
          body_text += top_list_as_text user # render table (check if user in the top 10 of all 12 games)

          UserMailer.msg_as_text(user.email, subject, body_text).deliver_now
          #
          # UserMailer.msg_as_html(user.email, subject, body_html).deliver_now
          # UserMailer.notify_user(user, msg).deliver_now
        end
      end

    end

  end

  def self.user_in_top10_of_all_games user

    @top = 10
    days_in_month = Time.days_in_month(Time.now.month-1, Time.now.year) #.months_ago(1).month)
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
       WHERE g.id = sc.game_id and u.id = sc.user_id AND g.id = #{game.try(:id)} AND sc.created_at >= '#{@dt1}' AND sc.created_at <= '#{@dt2}'
    GROUP BY g.title, u.full_name ORDER BY g.title, sum DESC limit #{@top}
                               ").each do |score|
        if user.try(:display_name) == score.try(:user).try(:display_name)
          list[:no]=no
          list[:gtitle]=game.try(:title)
          # text+="YOU (#{score.user.full_name}) \t"
          list[:uname]="YOU"
          list[:uscores]=score.try(:sum)
          dict << list
        end
      end
    end
    return dict
  end

  def self.top_list_as_text user

    @top = 10
    days_in_month = Time.days_in_month(Time.now.month-1, Time.now.year) #.months_ago(1).month)
    dt_utc = DateTime.now.utc #.months_ago(1) prev month
    @dt1 = DateTime.new(dt_utc.year, dt_utc.month, 1).strftime("%Y-%m-%d")
    @dt2 = DateTime.new(dt_utc.year, dt_utc.month, days_in_month).strftime("%Y-%m-%d")
    @time_range = @dt1..@dt2

    gid=0
    total_amount = 0
    text = " # #{'Game'.center(29, ' ')} Player #{ "Scores".rjust(18,' ')}  \n"
    # text+="".center(50,' ')+"\n"
    Game.order(:title).each do |game|

      gid += 1
      no = 0
      ScoreHistory.find_by_sql("SELECT *, SUM(sc.amount) as sum, COUNT(u.id) as count_user FROM score_histories sc, users u, games g
       WHERE g.id = sc.game_id and u.id = sc.user_id AND g.id = #{game.try(:id)} AND sc.created_at >= '#{@dt1}' AND sc.created_at <= '#{@dt2}'
    GROUP BY g.title, u.full_name ORDER BY g.title, sum DESC limit #{@top}
                               ").each do |score|

        if user.try(:display_name) == score.try(:user).try(:display_name)
          total_amount += score.try(:sum)
          text+=gid.to_s.rjust(2, ' ')+'. '
          text+=game.try(:title).ljust(27, ' ')+"\t"
          # text+="YOU (#{score.user.full_name}) \t"
          text+="  YOU   \t"
          text+="#{score.try(:sum)}".rjust(10,' ')+"\n"
        else

        end
      end
    end
    # text+="".center(58,'=')+"\n"
    # text+="Total Scores: #{total_amount}".rjust(58,' ')
    text+="Total Scores: #{total_amount}"

    text
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