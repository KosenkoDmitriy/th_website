require 'rails_helper'

RSpec.describe Admin::AdminUsersController, type: :controller do
  include Devise::TestHelpers

  # this lets us inspect the rendered results
  render_views

  let(:admin_user) { AdminUser.create!(email: 'admin@example.com', password: 'password')}

  before(:each) do
    sign_in admin_user
  end

  describe 'edit' do
    it 'renders user form' do
      get :edit, id: admin_user.to_param
      expect(assigns(:admin_user)).to eq admin_user
    end
  end

  describe 'update' do
    it 'updates user' do
      patch :update, { id: admin_user.to_param, admin_user: { email: 'nimda@example.com' }}
      admin_user.reload
      expect(admin_user.email).to eq 'nimda@example.com'
    end
  end

  describe "GET index" do
    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end
end
