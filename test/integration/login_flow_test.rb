require 'test_helper'

class HomePage < ActionDispatch::IntegrationTest
  test "can see the sign in page" do
    get "/sign_in"
    text = "Please return to this site every 24 hours to spin the FREE credits wheel to get FREE credits each day."
    # assert_select "h1", "users#index"
    assert_select "h1", text
  end
  test "displays the user's name or email after sign in" do
    email = "t@t.ru"
    password = "pass"
    user = User.create!(email: email, password: password)
    assert_select "form.new_user" do
      assert_select "input[name=?]", "email"
      assert_select "input[name=?]", "password"
      assert_select "input[type=?]", "submit"
    end
    post "/signin", email: email, password: password
    assert_select ".main_logo .text02 h4", :text => "Welcome {{email}}"
  end
end
