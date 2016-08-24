ActiveAdmin.register User do
  # scope("Inactive") { |scope| scope.where(is_active: false) }
  actions :all, except: [:new, :create]

  filter :full_name
  filter :email
  filter :phone_number
  filter :credits
  filter :is_active

  index do
    column "Avatar", :image_url do |u|
      link_to image_tag(u.image_url), u.url if u.url.present?
    end
    column :full_name
    column :email
    column :phone_number
    column :credits
    column :is_active
    column :last_login_dt
    column :created_at
    actions
  end

  form do |f| # edit form
    f.semantic_errors *f.object.errors.keys # To display a list of all validation errors:
    inputs 'Details' do
      input :full_name
      input :email
      input :phone_number
      input :credits
      input :is_active
    end
    f.actions
  end

  show do # view form
    attributes_table do
      row :full_name
      row :email
      row :phone_number
      row :credits
      row :url
      row :image_url
      row :created_at
      row :updated_at
      row :last_login_dt
      row :is_active
    end
  end

  # controller do
  #   def find_resource
  #     User.where(is_active: false)
  #   end
  # end

  # See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :full_name, :email, :phone_number, :credits, :is_active
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end


end
