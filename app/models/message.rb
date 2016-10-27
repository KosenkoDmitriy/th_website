class Message < ActiveRecord::Base
  #enum interval: [ :daily, :weekly, :monthly ]
  enum interval: { daily: 0, weekly: 1, monthly: 2 }
end
