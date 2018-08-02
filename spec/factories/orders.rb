FactoryGirl.define do
  factory :order do
    association :user
    association :credit
  end
end
