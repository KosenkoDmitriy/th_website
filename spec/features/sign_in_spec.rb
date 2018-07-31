# spec/features == system
require 'rails_helper'

RSpec.describe "sign in/up page", type: :feature do
  describe "GET /sign_in" do
    it "displays the user's email after sign in" do
      email = "di@mi.ru"
      password = "pass"
      user = FactoryGirl.create(:user, email: email, password: UsersHelper.pwd(password))
      visit sign_in_path
      fill_in "user[email]", with: email
      fill_in "user[password]", with: password
      click_button "Login with Email"
      # expect(page).to have_selector(".error", text: "")
      message = user.full_name.present? ? "Welcome #{user.full_name}" : "Welcome #{email}"
      expect(page).to have_selector(".text02", text: message)
    end
  end
  describe "GET /sign_up" do
    it "get bonus (free credits) to a new user after sign up" do

    end
  end
end
