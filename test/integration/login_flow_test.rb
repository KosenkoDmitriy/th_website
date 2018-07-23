require 'test_helper'
require 'digest/md5'

class HomePage < ActionDispatch::IntegrationTest
  test "can see the sign in page" do
    get "/sign_in"
    text = "Please return to this site every 24 hours to spin the FREE credits wheel to get FREE credits each day."
    # assert_select "h1", "users#index"
    assert_select "h1", text
  end
  test "displays the user's name or email after sign in" do
    email = "s3@s.ru"
    password = "s3@s.ru"

    user = User.create!(email: email, password: Digest::MD5.hexdigest(password))

    get sign_in_path
    assert_response :success

    assert_select "form.form-horizontal" do
      # assert_select '#user_email[value=?]', user.email
      # assert_select '#user_password[value=?]', user.password

      assert_select "input[name=?]", "user[email]"
      assert_select "input[name=?]", "user[password]"

      # assert_select "input[name=?]", "user[email]" do
      #   assert_select "[value=?]", email
      # end
      # assert_select "input[name=?]", "user[password]" do
      #   assert_select "[value=?]", password
      # end
      assert_select "input[type=?]", "submit"
    end
    post_via_redirect "/signin", "user[email]": email, "user[password]": password
    # post "/signin", user_email: email, user_password: password
    # assert_response 302
    # follow_redirect!
    user.reload
    assert_response :success
    # get user_path user
    assert_select ".text02", text: "Welcome #{email}"
    # assert_select ".error", text: ""
  end
end
