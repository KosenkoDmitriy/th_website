require "rails_helper"

RSpec.describe User, type: :model do

  it "has a valid factory" do
    expect(FactoryGirl.build(:user)).to be_valid
    expect(build(:user)).to be_valid
  end

  context "is valid" do
    it "with an email and password" do
      user = build(:user)
      expect(user).to be_valid
    end
  end

  context "is invalid" do
    it "without a password" do
      user = build(:user, password: nil)
      user.valid?
      expect(user.errors[:password]).to include("can't be blank")
    end
    it "without an email" do
      user = build(:user, email: nil)
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end
    it "with a duplicate email" do
      email = 'di@mi.ru'
      create(:user, email: email)
      user = build(:user, email: email)
      user.valid?
      expect(user.errors[:email]).to include('has already been taken')
    end
  end

  context "create" do
    it "with 2 or more orders" do
      email = "test@test.com"
      user = create(:user, email: email, full_name: nil)
      expect(user.display_name).to eq(email)

      order = user.orders.create!(status: "paid")
      order2 = user.orders.create(status: "unpaid")
      expect(user.orders).to eq([order, order2])
      expect(user.orders.count).to eq(2)
    end
    after(:all) { User.destroy_all }
  end

end
