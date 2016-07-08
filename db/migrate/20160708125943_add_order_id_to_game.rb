class AddOrderIdToGame < ActiveRecord::Migration
  def change
    add_column :games, :order_id, :int
  end
end
