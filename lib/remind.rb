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
        subject = msg.title
        body_html = msg.text
        if msg.is_sms
          body_html = msg.title + body_html
          #TODO: will sent an sms
        end
        if msg.is_email
          # body_html += table_html # TODO render table (check if user in the top 10 of all 12 games)
          UserMailer.msg_as_html(user.email, subject, body_html).deliver_now
        end
      end

    end

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