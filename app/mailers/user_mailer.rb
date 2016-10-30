class UserMailer < ApplicationMailer
  def notify_me(email, subject, body)
    mail(to: email, subject: subject, body: body)
  end

  def msg_as_html(email, subject, body)
    mail(to: email, subject: subject, body: body, content_type: "text/html")
  end

  def msg_as_text(email, subject, body)
    mail(to: email, subject: subject, body: body)
  end

  def notify_user(user, msg)
    @user=user
    @msg=msg

    # @top = 10
    # days_in_month = Time.days_in_month(Time.now.month-1, Time.now.year) #.months_ago(1).month)
    # dt_utc = DateTime.now.utc #.months_ago(1) prev month
    # @dt1 = DateTime.new(dt_utc.year, dt_utc.month, 1).strftime("%Y-%m-%d")
    # @dt2 = DateTime.new(dt_utc.year, dt_utc.month, days_in_month).strftime("%Y-%m-%d")
    # @time_range = @dt1..@dt2

    mail(to: user.email, subject: msg.title)
  end
end
