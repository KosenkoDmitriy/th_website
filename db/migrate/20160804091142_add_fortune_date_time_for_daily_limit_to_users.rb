class AddFortuneDateTimeForDailyLimitToUsers < ActiveRecord::Migration
  def change
    add_column :users, :fw_dt, :datetime
  end
end
