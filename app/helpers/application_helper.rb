module ApplicationHelper
  def th_game_url
    #Rails.configuration.x.th_game_url
    game = Game.find_by(fid: 'texas_holdem_foldup')
    game_path(game)
  end

  def self.gk p,e
    self.generate_key p,e
  end

  def is_mobile
    @browser_type = detect_browser
    @browser_type == 'mobile' ? true : false
    #@browser_type == 'desktop' ? true : false
  end

  private
  def self.generate_key password, email
    prng = Random.new()
    salt = prng.rand(100..1000)
    key = Digest::MD5.hexdigest("#{salt}#{email}#{password}")
    return key
  end


  MOBILE_BROWSERS = ["playbook", "windows phone", "android", "ipod", "iphone", "opera mini", "blackberry", "palm","hiptop","avantgo","plucker", "xiino","blazer","elaine", "windows ce; ppc;", "windows ce; smartphone;","windows ce; iemobile", "up.browser","up.link","mmp","symbian","smartphone", "midp","wap","vodafone","o2","pocket","kindle", "mobile","pda","psp","treo"]

  def detect_browser
    agent = request.headers["HTTP_USER_AGENT"].downcase

    MOBILE_BROWSERS.each do |m|
      return "mobile" if agent.match(m)
    end
    return "desktop"
  end


end
