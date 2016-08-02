class AddFacebookUrlToGames < ActiveRecord::Migration
  def change
    add_column :games, :fb_url, :string
  end
end
