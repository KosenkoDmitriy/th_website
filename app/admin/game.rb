ActiveAdmin.register Game do
  permit_params :id, :title, :text, :url, :created_at, :updated_at, :fid, :is_skipped_login, :order_id, :offsetX, :offsetY, :width, :height, :fb_url, :is_embedded, :counter

  # custom scope not defined on the model
  scope :all
  scope("Popular", default: true) { |scope| scope.reorder(counter: :desc, title: :asc) }

  index do
    selectable_column
    id_column
    column :title
    column 'Views', :counter
    column :created_at
    column :updated_at
    actions
  end

end
