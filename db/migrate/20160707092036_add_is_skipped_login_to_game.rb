class AddIsSkippedLoginToGame < ActiveRecord::Migration
  def change
    add_column :games, :is_skipped_login, :boolean
  end
end
