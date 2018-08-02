require 'rails_helper'

RSpec.describe Order, type: :model do
  it "has a valid factory" do
    expect(create(:order)).to be_valid
    expect(FactoryGirl.build(:order)).to be_valid
    expect(build(:order)).to be_valid
  end
  context "is valid" do
    it 'when user has two orders' do
      user = create(:user)
      order = create(:order, user: user)
      order2 = create(:order, user: user)
      expect(user.orders.count).to eq 2
    end
  end
  context "is invalid" do

  end

end
