class AddIsEmbeddedToGames < ActiveRecord::Migration
  def change
    add_column :games, :is_embedded, :bool, default: true
  end
end
