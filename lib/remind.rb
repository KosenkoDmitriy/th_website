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
  end

  def self.unsubscribe
    u = User.find(1)
    u.update_columns(is_subscribed: false)# if u.is_subscribed
  end

  def self.subscribe
    u = User.find(1)
    u.update_columns(is_subscribed: true)
  end

end