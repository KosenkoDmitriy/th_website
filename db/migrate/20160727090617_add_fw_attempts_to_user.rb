class AddFwAttemptsToUser < ActiveRecord::Migration
  def change
    add_column :users, :fw_attempts, :int, default:1
  end
end
