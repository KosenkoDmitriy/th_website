require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ThWebsite
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true

    # + 100 000 credits after login every day (only one once)
    config.x.win_for_login = 10000

    # 35 000 credits for new registraion/sign up
    config.x.win_for_reg = 35000

    # api host for webgl
    #config.x.api.host = 'shopomob.ru'
    #config.x.th_game_url = "https://th.webgl64.shopomob.ru"

    config.x.api.host = 'yourplaceforfun.com'
    config.x.th_game_url = 'https://game.yourplaceforfun.com'

    config.x.fw_attempts = 3 # daily limit for fortune wheel
  end
end
