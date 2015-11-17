class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :full_name
      t.string :email
      t.string :phone_number
      t.string :password
      t.string :confirm_password
      t.float :credits

      t.timestamps null: false
    end
  end
end
