class UserMailer < ApplicationMailer
  def notify_me(email, subject, body)
    mail(to: email, subject: subject, body: body)
  end

  def msg_as_html(email, subject, body)
    mail(to: email,
         body: body,
         content_type: "text/html",
         subject: subject)
  end
end
