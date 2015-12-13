class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.belongs_to :user, index: true
      t.belongs_to :credit, index: true

      t.string :ip
      t.string :express_token
      t.string :express_payer_id

      t.timestamps null: false
    end
  end
end
