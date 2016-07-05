class AddFriendlyIdToGameModel < ActiveRecord::Migration
  def change
    add_column :games, :fid, :string
  end
end
