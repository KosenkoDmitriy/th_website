class UserMailer < ActionMailer::Base

  def notify_me(email, subject, body)
    mail(to: email, subject: subject, body: body)
  end

end
