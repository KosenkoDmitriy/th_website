class CreateCredits < ActiveRecord::Migration
  def change
    create_table :credits do |t|
      t.string :title
      t.float :cost_in_cents
      t.float :credits
      t.datetime :dt
      t.text :text

      t.timestamps null: false
    end
  end
end
