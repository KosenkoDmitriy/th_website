ActiveAdmin.register_page "Dashboard" do

  menu false #priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    # div class: "blank_slate_container", id: "dashboard_default_message" do
    #   span class: "blank_slate" do
    #     span I18n.t("active_admin.dashboard_welcome.welcome")
    #     small I18n.t("active_admin.dashboard_welcome.call_to_action")
    #   end
    # end

    # Here is an example of a simple dashboard with columns and panels.

    columns do
      column do
        panel "Recent Users" do
          ul do
            User.last(30).reverse.map do |user|
              if user.image_url.present?
                li link_to(image_tag(user.image_url), admin_user_path(user))
              else
                li link_to(user.full_name + " " + user.email, admin_user_path(user))
              end
            end
          end
        end
      end

      column do
        panel "Recent Orders" do
          # para "Welcome to ActiveAdmin."
          ul do
            Order.last(30).reverse.map do |order|
              li link_to("Order ##{order.id}", admin_order_path(order))
            end
          end
        end
      end

      # column do
      #   div do
      #     text_node %{<iframe src="https://analytics.google.com/analytics/web/?authuser=0#report/defaultid/a82931218w122510757p128185568/" width="800" height="600" scrolling="yes" frameborder="no"></iframe>}.html_safe
      #     #https://analytics.google.com/analytics/web/?authuser=0#report/defaultid/a82931218w122510757p128185568/
      #   end
      # end

    end
  end # content
end


ActiveAdmin.setup do |config|
  config.namespace :admin do |admin|
    admin.comments = false
  end
end