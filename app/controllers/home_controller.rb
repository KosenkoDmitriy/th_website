class HomeController < ApplicationController

  def index
    @user = User.new
    @creditList = get_credits
  end

  def show

  end

  def buy
    # TODO: integrate with PayPal
    @creditList = get_credits
  end

  private
  def get_credits
    @credtits = Rails.configuration.x
    creditList = [
        {cost: @credtits.one.cost, value: @credtits.one.value},
        {cost: @credtits.two.cost, value: @credtits.two.value},
        {cost: @credtits.three.cost, value: @credtits.three.value},
        {cost: @credtits.four.cost, value: @credtits.four.value}
    ]
    return creditList
  end

end
