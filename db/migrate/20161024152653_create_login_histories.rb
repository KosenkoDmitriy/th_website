class CreateLoginHistories < ActiveRecord::Migration
  def change
    create_table :login_histories do |t|
      t.integer :count
      t.belongs_to :user, index: true
      t.timestamps null: false
    end
  end
end
