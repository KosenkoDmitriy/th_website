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
    mail(to: user.email, subject: msg.title)
  end
end
