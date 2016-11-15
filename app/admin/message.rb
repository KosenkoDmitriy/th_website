ActiveAdmin.register Message do
  #menu false
  permit_params :title, :text, :interval, :is_published, :is_email, :is_sms


  filter :title
  filter :text
  filter :interval
  filter :is_published
  filter :created_at
  filter :updated_at


  form do |f| # edit form
    f.semantic_errors *f.object.errors.keys # To display a list of all validation errors:
    inputs 'Details' do
      input :title
      input :text
      input :interval
      input :is_published
    end
    f.actions
  end

  show do # view form
    attributes_table do
      row :title
      row :text
      row :interval
      row :is_published

      row :created_at
      row :updated_at
    end
  end

  index do
    selectable_column
    id_column
    column :title
    # column :text
    column :interval
    column :is_published

    column :created_at
    column :updated_at
    actions
  end

end
