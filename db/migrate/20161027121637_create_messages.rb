class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :title
      t.text :text
      t.string :interval
      t.boolean :is_email, default: true
      t.boolean :is_sms, default: true
      t.boolean :is_published, default: true

      t.timestamps null: false
    end
  end
end
