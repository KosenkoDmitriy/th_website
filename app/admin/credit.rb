ActiveAdmin.register Credit do

permit_params :id, :title, :cost_in_cents, :credits, :dt, :text, :created_at, :updated_at

  form do |f| # edit form
    f.semantic_errors *f.object.errors.keys # To display a list of all validation errors:
    inputs 'Details' do
      #input :id
      input :title
      input :cost_in_cents
      input :credits
      input :text
    end
    f.actions
  end

  show do # view form
    attributes_table do
      row :title
      row :cost_in_cents
      row :credits
      row :credits
      row :text
      row :updated_at
      row :created_at
    end
  end

end
