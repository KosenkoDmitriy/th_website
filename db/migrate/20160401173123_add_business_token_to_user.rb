class AddBusinessTokenToUser < ActiveRecord::Migration
  def change
    add_column :users, :bt, :string
  end
end
