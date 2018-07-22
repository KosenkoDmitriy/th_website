require "rails_helper"

RSpec.describe User, :type => :model do
  context "create user" do
    it "with 2 or more orders" do
      email = "test@test.com"
      user = User.create!(email: email, password: email)
      expect(user.display_name).to eq(email)

      order = user.orders.create!(status: "paid")
      order2 = user.orders.create(status: "unpaid")
      expect(user.orders).to eq([order, order2])
      expect(user.orders.count).to eq(2)
    end
    after(:all) { User.destroy_all }
  end

end
