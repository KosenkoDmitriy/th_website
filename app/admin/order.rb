ActiveAdmin.register Order do
  actions :all, except: [:new, :create]

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :user_id, :credit_id, :ip, :express_token, :express_payer_id, :created_at, :updated_at, :dt, :status
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end


end
