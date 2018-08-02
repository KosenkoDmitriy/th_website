# require 'rails_helper'

FactoryGirl.describe Credit do
  it "has a valid factory" do
    expect(build(:credit)).to be_valid
  end
  context "in credits" do
    it "display number with delimiter" do
      cost = 1000000
      credit = build(:credit, credits: cost)
      expect(credit.fcredits).to eq "1,000,000"
    end
    it "display 0" do
      credit = create(:credit, title: nil, cost_in_cents: 0)
      expect(credit.credits).to eq 0
    end
  end
  context "in cents" do
    it "display finance format" do
      credit = create(:credit, title: nil, cost_in_cents: 100)
      expect(credit.cost_in_cents).to eq 100
      expect(credit.display_name).to eq "$1.0"
    end
    it "display 0" do
      credit = build(:credit, title: nil, cost_in_cents: 0)
      expect(credit.cost_in_cents).to eq 0
      expect(credit.display_name).to eq "$0.0"
    end
    it "convert 0 cents to $0" do
      credit = build(:credit, cost_in_cents: 0)
      expect(credit.fcost).to eq "$0.00"
    end
    it "convert 100 cents to $1" do
      credit = build(:credit, cost_in_cents: 100)
      expect(credit.fcost).to eq "$1.00"
    end
    it "convert 1M cents to $1K" do
      credit = build(:credit, cost_in_cents: 100000)
      expect(credit.fcost).to eq "$1,000.00"
    end

  end
end
