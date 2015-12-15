class Credit < ActiveRecord::Base

  def fcost
    fcost = cost_in_cents/100 rescue 0
    number_to_currency(fcost)
  end

  def fcredits
    number_with_delimiter(credits.to_i)
  end
end
