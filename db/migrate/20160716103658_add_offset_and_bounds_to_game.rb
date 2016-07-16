class AddOffsetAndBoundsToGame < ActiveRecord::Migration
  def change
    add_column :games, :offsetX, :string
    add_column :games, :offsetY, :string
    add_column :games, :width, :string
    add_column :games, :height, :string
  end
end
