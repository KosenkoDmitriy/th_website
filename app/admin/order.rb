ActiveAdmin.register Order do
  actions :all, except: [:new, :create]

  permit_params :user_id, :credit_id, :ip, :express_token, :express_payer_id, :created_at, :updated_at, :dt, :status, :payment_type, :payment_type_help

  filter :status, as: :select, collection: ["paid", "unpaid"]
  filter :payment_type, as: :select, collection: ["echeck", "instant"]

  preserve_default_filters!
  #filter :user, as: :select
  #filter :credit, as: :select

  # def scoped_collection
  #   super.includes :credit # prevents N+1 queries to your database
  # end

  index do
    selectable_column
    id_column
    column :ip
    # column :express_token
    # column :updated_at
    # column :dt
    column :status
    column :payment_type
    column "Info" do |info|
      if info.payment_type == 'instant'
        I18n.t("devise.paypal.payment_type.instant")
      elsif info.payment_type == 'echeck'
        I18n.t("devise.paypal.payment_type.echeck")
      end
    end
    column "$" do |o|
      Credit.find_by(o.credit_id).cost_in_cents/100
      #text_node "#{Credit.find_by(o.credit_id).cost_in_cents}"
    end
    # column "" do |order|
    #   table_for order.credit do
    #     #column :credits
    #     column "cents", :cost_in_cents
    #     column "Game Credits",     :credits
    #     # column(:payment_type) { |payment| payment.payment_type.titleize }
    #   end
    # end

    actions
  end

end
