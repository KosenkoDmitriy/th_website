module ApplicationHelper
  def th_game_url
    Rails.configuration.x.th_game_url
  end

  def self.gk p,e
    self.generate_key p,e
  end

  private
    def self.generate_key password, email
      prng = Random.new()
      salt = prng.rand(100..1000)
      key = Digest::MD5.hexdigest("#{salt}#{email}#{password}")
      return key
    end
end
