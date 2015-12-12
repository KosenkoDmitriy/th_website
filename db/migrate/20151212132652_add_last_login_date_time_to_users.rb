class AddLastLoginDateTimeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :last_login_dt, :datetime
  end
end
