ActiveAdmin.register ThLoginHistory do
  menu label: "TH Mobile Login History"

  # scope :all
  # scope("Popular", default: true) { |scope| scope.reorder(counter: :desc, title: :asc) }

  permit_params :user_id, :platform, :created_at, :updated_at

  sidebar :stats, partial: 'stats', priority:0


  index do
    selectable_column
    # column "User", :user_id do |u|
    #   link_to User.find(u).try(:full_name) if u.present?
    # end
    column :platform
    column :user_id
    column :created_at
    actions
  end
end
