class EmailProcessor
  def self.process(email)
    #Post.create!({ body: email.body, email: email.from })
    email_to = Rails.configuration.x.email_to
    user=User.find_by(email:email.from) if User.exists?(email:email.from)
    title = "Your Place For Fun. Request from #{user.try(:full_name)}<#{email.from}>"
    UserMailer.notify_me(email_to, title, email.body).deliver_now
  end
end
