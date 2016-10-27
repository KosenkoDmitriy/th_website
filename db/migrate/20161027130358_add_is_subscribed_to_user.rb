class AddIsSubscribedToUser < ActiveRecord::Migration
  def change
    add_column :users, :is_subscribed, :boolean, default:true
  end
end
