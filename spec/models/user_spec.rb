require "rails_helper"

RSpec.describe User, type: :model do

  context "is valid" do
    it "with an email and password" do
      user = User.new(email: 'test@test.com', password: 'test')
      expect(user).to be_valid
    end
  end

  context "is invalid" do
    it "without a password" do
      user = User.new(email: 'test@test.com', password: nil)
      user.valid?
      expect(user.errors[:password]).to include("can't be blank")
    end
    it "without an email" do
      user = User.new(email: nil)
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end
    it "with a duplicate email" do
      email = 'test@ex.ru'
      password = 'test'
      User.create(email: email, password: password)
      user = User.new(email: email, password: password)
      user.valid?
      expect(user.errors[:email]).to include('has already been taken')
    end
  end

  context "create" do
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
