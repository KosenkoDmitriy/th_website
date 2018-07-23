require 'rails_helper'

RSpec.describe "sign in/up page", :type => :request do
  it "displays the user's name or email after sign in" do
    email = "t@t.ru"
    password = "pass"
    # game = FactoryGirl.create!(:game, fid: 'texas_holdem_foldup')
    user = User.create!(email: email, password: password)
    get "/sign_in"
    assert_select "form.new_user" do
      assert_select "input[name=?]", "email"
      assert_select "input[name=?]", "password"
      assert_select "input[type=?]", "submit"
    end
    post "/signin", email: email, password: password
    assert_select ".main_logo .text02 h4", :text => "Welcome {{email}}"

  end
end
