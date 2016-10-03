class AddShortDescriptionToGame < ActiveRecord::Migration
  def change
    add_column :games, :stext, :string
  end
end
