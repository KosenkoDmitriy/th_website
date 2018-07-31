FactoryGirl.define do
   factory :user do
     full_name "Di Mi"
     sequence(:email) { |n| "di#{n}@mi.ru"}
     password "pass"
   end
end
