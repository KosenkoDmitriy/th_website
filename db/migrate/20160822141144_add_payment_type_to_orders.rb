class AddPaymentTypeToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :payment_type, :string
    add_column :orders, :payment_type_help, :string
  end
end
