ActiveAdmin.register Game do
  permit_params :id, :title, :text, :stext, :url, :created_at, :updated_at, :fid, :is_skipped_login, :order_id, :offsetX, :offsetY, :width, :height, :fb_url, :is_embedded, :counter

  # custom scope not defined on the model
  scope :all
  scope("Popular", default: true) { |scope| scope.reorder(counter: :desc, title: :asc) }

  index do
    selectable_column
    id_column
    # column :order_id
    column :title
    column 'Views', :counter
    column :created_at
    column :updated_at
    actions
  end

  form do |f| # edit form
    f.semantic_errors *f.object.errors.keys # To display a list of all validation errors:
    inputs 'Details' do
      input :title
      input :text, label: 'Description in html'
      input :stext, label: 'Short Description in html'

      input :counter, label: 'Views'

      # input :order_id
    end
    inputs "Game Bounds" do
      input :offsetX
      input :offsetY
      input :width
      input :height
    end
    f.actions
  end

  show do # view form
    attributes_table do
      row :title
      row "Description in html" do
        resource.text
      end
      row "Short Description in html" do
        resource.stext
      end
      row 'Views' do
        resource.counter
      end

      row :offsetX
      row :offsetY
      row :width
      row :height

      # row :order_id
      row :created_at
      row :updated_at
    end
  end

end
