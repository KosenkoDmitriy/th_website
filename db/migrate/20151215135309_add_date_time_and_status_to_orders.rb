class AddDateTimeAndStatusToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :dt, :datetime
    add_column :orders, :status, :string, default: "unpaid"
  end
end
