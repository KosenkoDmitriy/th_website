class Message < ActiveRecord::Base
  after_create :send_user_notification
  after_update :send_user_notification

  #enum interval: [ :daily, :weekly, :monthly ]
  enum interval: {daily: 0, weekly: 1, monthly: 2}

  def send_user_notification
    if interval.blank? && is_published # will send only one email
      User.where(is_subscribed: true).each do |user|
        # if is_email
          UserMailer.notify_user(user, self).deliver_now # TODO: deliver_later ?
        # end
        # if is_sms
        #   #TODO: sms integration
        # end
      end
    end
  end
end
