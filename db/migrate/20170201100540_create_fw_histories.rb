class CreateFwHistories < ActiveRecord::Migration
  def change
    create_table :fw_histories do |t|
      t.float :amount
      t.belongs_to :user, index: true

      t.boolean :is_mobile
      t.string :source

      t.timestamps null: false
      t.timestamps null: false
    end
  end
end
