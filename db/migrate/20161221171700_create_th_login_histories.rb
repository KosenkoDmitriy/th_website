  class CreateThLoginHistories < ActiveRecord::Migration
    def change
      create_table :th_login_histories do |t|
        t.string :platform
        t.belongs_to :user, index: true
        t.timestamps null: false
      end
    end
  end
