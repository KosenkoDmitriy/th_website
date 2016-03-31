class SocialLoginForUser < ActiveRecord::Migration

  def change
  # def self.up
    add_column :users, :name, :string
    add_column :users, :location, :string
    add_column :users, :image_url, :string
    add_column :users, :url, :string

    add_column :users, :provider, :string
    # change_column :users, :provider, :string, null: false

    add_column :users, :uid, :string
    # change_column :users, :uid, :string, null: false

    add_index :users, :provider
    add_index :users, :uid
    add_index :users, [:provider, :uid], unique: true
  end

  # def self.down
  #   remove_column :users, :name
  #   remove_column :users, :location
  #   remove_column :users, :image_url
  #   remove_column :users, :url
  #   remove_column :users, :provider
  #   remove_column :users, :uid
  # end
end
