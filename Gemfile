source 'https://rubygems.org'

# gem 'ruby', '2.2.2'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5'
# Use sqlite3 as the database for Active Record
gem 'sqlite3', '1.3.11'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
#gem install therubyracer -- --with-system-v8
#gem 'therubyracer', platforms: :ruby # 0.12.3, 0.12.2
gem 'therubyracer', '0.12.2'
# Use jquery as the JavaScript library
gem 'jquery-rails', '4.0.5'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks', '2.5.3'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # add some extra Rails-specific features.
  gem 'rspec-rails', '~> 3.7'
  # replaces Rails’ default fixture with factories
  gem 'factory_girl_rails', '4.9.0' #
end

group :test do
  # generate a test coverage report after each spec run
  gem 'simplecov', '0.16.1', require: false
  # generates names, email addresses and placeholders for factories
  gem "faker", "~> 1.9.1"
  # simulate users' interactioons
  gem "capybara", "~> 2.18.0"
  # cleaning data from the test database after each spec run
  gem "database_cleaner", "~> 1.7.0"
  # It opens your default web browser on demand to show you what your application is rendering. Very useful for debugging tests.
  gem "launchy", "~> 2.4.3"
  # test JavaScript-based browser interactions with Capybara
  gem "selenium-webdriver", "~> 3.13.1"
end

group :development do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', '8.2.0'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring', '1.4.3'
end

gem 'responders', '~> 2.0'

gem 'activemerchant', '1.56.0'

gem 'simple_captcha2', require: 'simple_captcha' # 0.3.4

# gem 'omniauth-twitter'
gem 'omniauth-facebook', '3.0.0'

gem 'activeadmin', github: 'activeadmin' # 4.2.5
gem 'devise', '4.2.0'

gem 'whenever', :require => false # 0.9.7

gem 'griddler', '1.3.1'
gem 'griddler-sendgrid', '1.0.0'
