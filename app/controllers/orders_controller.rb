class OrdersController < ApplicationController

  def express_checkout
    order = Order.find(params[:order_id])
    @amount = order.credit.cost_in_cents.to_i
    response = EXPRESS_GATEWAY.setup_purchase(@amount,
                                              ip: request.remote_ip,
                                              return_url: user_orders_url(current_user),
                                              cancel_return_url: user_orders_url(current_user),
                                              currency: "USD",
                                              allow_guest_checkout: true,
                                              items: [{name: "Order", description: "buy #{order.credit.credits.to_i} credits", quantity: "1", amount: @amount}]
    )
    redirect_to EXPRESS_GATEWAY.redirect_url_for(response.token)
  end

  def index
    @orders = Order.all.reverse
  end

  def new
    @order = Order.new(:express_token => params[:token])
    # @credit = Credit.new()
    @creditList = Credit.all
  end

  def create
    @order = Order.new#(order_params) #@cart.build_order(order_params)
    @order.ip = request.remote_ip
    @order.credit = Credit.find(params[:credit_id])
    @order.user = current_user

    # ActiveMerchant accepts all amounts as Integer values in cents
    # amount = 1000  # $10.00

    # The card verification value is also known as CVV2, CVC2, or CID
    # credit_card = ActiveMerchant::Billing::CreditCard.new(
    #     :first_name => 'Bob',
    #     :last_name => 'Bobsen',
    #     :number => '4242424242424242',
    #     :month => '8',
    #     :year => Time.now.year+1,
    #     :verification_value => '000')

    if @order.save
      if @order.purchase #(@order.cost_in_cents, credit_card) # this is where we purchase the order. refer to the model method below
        flash[:success] = "Successfully charged $#{sprintf("%.2f", amount / 100)} to the credit card #{credit_card.display_number}"
        redirect_to order_url(@order)
      else
        #render :action => 'failure'
        flash[:error] = "failure"
        redirect_to user_orders_path(current_user)

      end
    else
      render :action => 'new'
    end
  end

  def failure
    flash[:error] = "failure"
    # render plain: "failure"
    # return
    redirect_to users_orders_path(current_user)
  end

  def show
    @order = Order.find(params[:id])
  end

  private
  def order_params
    # params.require(:order).permit(:express_token, :express_payer_id, :ip, :user_id, :credit_id)
    params.permit(:express_token, :express_payer_id, :ip, :user_id, :credit_id)
  end

end
