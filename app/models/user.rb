class User < ActiveRecord::Base
  include ActionView::Helpers::NumberHelper
  
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true

  has_many :orders, dependent: :destroy

  def display_name
    res = email if email.present?
    res = full_name if full_name.present?
    res = name if name.present?
    res
  end

  def fcredits
    number_with_delimiter(credits.to_i)
  end


  def self.from_omniauth(auth_hash)

    # user = find_or_create_by(uid: auth_hash['uid'], provider: auth_hash['provider'])
    if (exists?(uid: auth_hash['uid'], provider: auth_hash['provider'])) # existing user
      user = find_by(uid: auth_hash['uid'], provider: auth_hash['provider'])

    else # new user
      user = create(uid: auth_hash['uid'], provider: auth_hash['provider'])
      # user.credits = Rails.configuration.x.win_for_reg

      user.full_name = user.name = auth_hash['info']['name']
      user.location = auth_hash['info']['location']
      user.image_url = auth_hash['info']['image']
      # user.url = auth_hash['info']['urls']['Twitter'] # Twitter

      # Start Facebook
      user.url = auth_hash['info']['urls'][user.provider.capitalize] # facebook
      user.email = auth_hash['info']['email']
      user.password = auth_hash['credentials']['token']
      user.bt = auth_hash['extra']['raw_info']['token_for_business']
      # End facebook

      user.save!
    end


    user
  end
end
