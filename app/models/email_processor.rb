class EmailProcessor
  def initialize(email)
    @email = email
  end
  def process
    email_to = Rails.configuration.x.email_to
    title = "Your Place For Fun. Request from #{@email.from[:full]}"
    UserMailer.notify_me(email_to, title, @email.body).deliver_now
  end
end