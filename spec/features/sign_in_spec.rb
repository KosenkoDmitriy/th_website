# spec/features == system
require 'rails_helper'

FactoryGirl.define do
  factory :user do
#     full_name             "Di Mi"
#     email                 "di@mi.ru"
#     password              "pass"
  end
end

RSpec.describe "sign in/up page", type: :feature do
  describe "GET /sign_in" do
    it "displays the user's email after sign in" do
      email = "di@mi.ru"
      password = "pass"
      user = FactoryGirl.create(:user, email: email, password: password)
      visit sign_in_path
      fill_in "user[email]", :with => email
      fill_in "user[password]", :with => password
      click_button "Login with Email"

      expect(page).to have_selector(".text02", text: "Welcome #{email}")
    end
  end
end
