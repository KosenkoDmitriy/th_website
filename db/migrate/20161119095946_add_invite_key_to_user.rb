class AddInviteKeyToUser < ActiveRecord::Migration
  def change
    add_column :users, :key_invite, :string
  end
end
