class User < ActiveRecord::Base
  apply_simple_captcha

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true

  has_many :orders, dependent: :destroy
end
