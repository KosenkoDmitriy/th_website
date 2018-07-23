# spec/integration == requests == api
require 'rails_helper'
FactoryGirl.define do
  factory :user do
    full_name             "Di Mi"
    email                 "di@mi.ru"
    password              "pass"
  end
end
RSpec.describe "sign in/up page", type: :request do
  describe "GET /sign_in" do
    it "sign in page should work" do
      get sign_in_path
      expect(response).to have_http_status(200)
    end
    it "displays the user's email after sign in" do
      email = "t@t.ru"
      password = "pass"
      user = FactoryGirl.create(:user, email: email, password: password)
      visit sign_in_path # "/sign_in"
      fill_in "Username", :with => email
      fill_in "Password", :with => password
      click_button "Log with Email"

      expect(page).to have_selector(".main_logo .text02 h4", text: "Welcome {{email}}")
    end
  end
end
