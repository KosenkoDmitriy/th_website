ActiveAdmin.register ThLoginHistory do
  menu label: "TH Mobile Login History"

  # scope :all
  # scope("Popular", default: true) { |scope| scope.reorder(counter: :desc, title: :asc) }

  permit_params :user_id, :platform, :created_at, :updated_at

  sidebar :stats, partial: 'stats', priority:0

end
