class Game < ActiveRecord::Base
  has_many :score_history, dependent: :destroy
end
