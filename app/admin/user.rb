ActiveAdmin.register User do
  # scope_to :current_user, if:     proc{ current_user.is_active? }
  # scope :all, is_active: :false
  # scope("Inactive") { |scope| scope.where(is_active: false) }

  index do
    actions
    column "Avatar", :image_url do |u|
      link_to image_tag(u.image_url), u.url
    end
    column :full_name
    column :email
    column :phone_number
    column :credits
    column :is_active
    column :last_login_dt
    column :created_at
  end

  # controller do
  #   def find_resource
  #     User.where(is_active: false)
  #   end
  # end

  # See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end


end
