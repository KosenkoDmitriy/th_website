class OrdersController < ApplicationController
  before_action :check_permissions

  def express_checkout
    order = Order.find(params[:order_id])
    @amount = order.credit.cost_in_cents.to_i
    response = EXPRESS_GATEWAY.setup_purchase(@amount,
                                              ip: request.remote_ip,
                                              return_url: user_order_url(current_user, order),
                                              cancel_return_url: user_order_url(current_user, order),
                                              currency: "USD",
                                              allow_guest_checkout: true,
                                              items: [{name: "Order", description: "buy #{order.credit.credits.to_i} credits", quantity: "1", amount: @amount}]
    )
    redirect_to EXPRESS_GATEWAY.redirect_url_for(response.token)
  end

  def index
    @order = order_new
    @orders = Order.where(user: current_user).reverse
  end

  def new
    @order = Order.new(:express_token => params[:token])
    @creditList = credits
  end

  def show
    token = params[:token]
    payer_id = params[:PayerID]
    if token.present? && payer_id.present?
      order = Order.find(params[:id])
      order.express_token = token
      order.express_payer_id = payer_id
      if order.save
        if order.purchase #(@order.cost_in_cents, credit_card) # this is where we purchase the order. refer to the model method below
          flash[:success] = "Successfully charged $#{sprintf("%.2f", order.credit.cost_in_cents / 100) rescue 0} and bought #{order.try(:credit).try(:credits).try(:to_i)} credits"
          redirect_to user_order_url(current_user, order)
        else
          #render :action => 'failure'
          flash[:error] = "failure"
          redirect_to user_order_url(current_user, order)
          # redirect_to user_orders_path(current_user)
        end
        flash[:notice] = "save success #{token} #{payer_id}"
      else
        flash[:error] = "save error #{token} #{payer_id}"
      end
    end
    @order = Order.find_by(id: params[:id], user: current_user)
    @creditList = credits
  end

  def create
    @order = Order.new #(order_params) #@cart.build_order(order_params)
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
      flash[:success] = 'order created successfully - please confirm it'
      redirect_to user_order_url(current_user, @order)
      # if @order.purchase #(@order.cost_in_cents, credit_card) # this is where we purchase the order. refer to the model method below
      #   flash[:success] = "Successfully charged $#{sprintf("%.2f", amount / 100)} to the credit card #{credit_card.display_number}"
      #   redirect_to order_url(@order)
      # else
      #   #render :action => 'failure'
      #   flash[:error] = "failure"
      #   redirect_to order_url(@order)
      #   # redirect_to user_orders_path(current_user)
      # end
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

  private
  def order_params
    # params.require(:order).permit(:express_token, :express_payer_id, :ip, :user_id, :credit_id)
    params.permit(:express_token, :express_payer_id, :ip, :user_id, :credit_id)
  end

end
