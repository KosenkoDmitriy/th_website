class Credit < ActiveRecord::Base
  def self.cost
    return cost_in_cents/100 rescue 0
  end
end
