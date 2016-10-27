module Remind
  def self.daily
    unsubscribe
  end

  private
  def self.unsubscribe
    u = User.find(1)
    u.update_columns(is_subscribed: false)# if u.is_subscribed
  end

  def self.subscribe
    u = User.find(1)
    u.update_columns(is_subscribed: true)
  end

end