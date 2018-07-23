module UsersHelper

  def self.pwd p
    self.generate_pwd p
  end

  private
  def self.pwd password
    return nil if password.blank?
    Digest::MD5.hexdigest(password)
  end
end
