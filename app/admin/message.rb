ActiveAdmin.register Message do

  permit_params :title, :text, :interval, :is_published, :is_email, :is_sms

end
