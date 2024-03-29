class User < ActiveRecord::Base
  include ActionView::Helpers::NumberHelper

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true

  has_many :orders, dependent: :destroy

  has_many :login_history, dependent: :destroy
  has_many :score_history, dependent: :destroy

  def display_name
    res = email if email.present?
    res = full_name if full_name.present?
    res = name if name.present?
    res
  end

  def fcredits
    number_with_delimiter(credits.to_i)
  end


  def self.from_omniauth(auth_hash, key_invite)
    user = nil
    # user = find_or_create_by(uid: auth_hash['uid'], provider: auth_hash['provider'])
    if (exists?(uid: auth_hash['uid'], provider: auth_hash['provider'])) # existing user
      user = find_by(uid: auth_hash['uid'], provider: auth_hash['provider'])
    elsif (exists?(email:auth_hash['info']['email'])) # update existing user with a new info
      user = find_by(email:auth_hash['info']['email'])
      user = update_fields(user, auth_hash, key_invite)
    else # new user
      # user = create(uid: auth_hash['uid'], provider: auth_hash['provider'])
      user = User.new(uid: auth_hash['uid'], provider: auth_hash['provider'])
      # user.credits = Rails.configuration.x.win_for_reg
      user = update_fields(user, auth_hash, key_invite)
    end

    user
  end

  def generate_key_invite email, key_invite
    if key_invite #session[:k].present? # invintation key
      if User.exists?(id:key_invite) && !User.exists?(email:email)
        user_refferal = User.find_by(id:key_invite)
        if user_refferal.credits.blank?
          user_refferal.credits = Rails.configuration.x.win_for_invite
        else
          user_refferal.credits += Rails.configuration.x.win_for_invite
        end
        self.key_invite = user_refferal.id # Digest::MD5.hexdigest(email)
        user_refferal.save
      end
    end
  end

  private
  def self.update_fields user, auth_hash, key_invite
    user.full_name = user.name = auth_hash['info']['name']
    user.location = auth_hash['info']['location']
    user.image_url = auth_hash['info']['image']
    # user.url = auth_hash['info']['urls']['Twitter'] # Twitter

    # Start Facebook
    user.url = auth_hash['info']['urls'][user.provider.capitalize] # facebook
    user.email = auth_hash['info']['email']
    user.password = auth_hash['credentials']['token']
    user.bt = auth_hash['extra']['raw_info']['token_for_business']
    user.generate_key_invite user.email, key_invite

    # End facebook
    user.save!
    user
  end
end
