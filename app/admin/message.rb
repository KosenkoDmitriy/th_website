ActiveAdmin.register Message do
  menu false
  permit_params :title, :text, :interval, :is_published, :is_email, :is_sms

end
