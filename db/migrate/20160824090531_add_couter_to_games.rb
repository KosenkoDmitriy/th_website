class AddCouterToGames < ActiveRecord::Migration
  def change
    add_column :games, :counter, :long, default: 0
  end
end
