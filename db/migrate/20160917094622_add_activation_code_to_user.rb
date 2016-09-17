class AddActivationCodeToUser < ActiveRecord::Migration
  def change
    add_column :users, :acode, :string 
  end
end
