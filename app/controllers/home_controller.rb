class HomeController < ApplicationController

  def index
    @user = User.new
  end

  def show

  end

  def buy
    # TODO: integrate with PayPal
    @credtits = Rails.configuration.x
    @creditList = [
        {cost: @credtits.one.cost, value: @credtits.one.value},
        {cost: @credtits.two.cost, value: @credtits.two.value},
        {cost: @credtits.three.cost, value: @credtits.three.value},
        {cost: @credtits.four.cost, value: @credtits.four.value}
    ]
  end

end
