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
  end
end
