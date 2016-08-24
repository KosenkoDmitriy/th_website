ActiveAdmin.register Order do
  actions :all, except: [:new, :create]

  permit_params :user_id, :credit_id, :ip, :express_token, :express_payer_id, :created_at, :updated_at, :dt, :status, :payment_type, :payment_type_help

  filter :status, as: :select, collection: ["paid", "unpaid"]
  filter :payment_type, as: :select, collection: ["echeck", "instant"]

  preserve_default_filters!

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

  # form do |f| # edit form
  #   f.semantic_errors *f.object.errors.keys # To display a list of all validation errors:
  #   inputs 'Details' do
  #     input :user_id, as: :select
  #     input :credit_id, as: :select
  #     input :ip
  #     input :status
  #     input :payment_type
  #   end
  #   f.actions
  # end

  show do # view form
    attributes_table do
      row :user_id
      row :credit_id
      row :ip
      row :express_token
      row :express_payer_id
      row :created_at
      row :updated_at
      #row :dt
      row :status
      row :payment_type
      # row :payment_type_help
    end
  end

end
