RSpec.describe FwHistory, type: :model do
  it "has a valid factory" do
    expect(build(:fw_history)).to be_valid
  end
  it "belong to user" do
    user = build(:user)
    item = build(:fw_history, user: user)
    expect(item.user).to eq user
  end
end
