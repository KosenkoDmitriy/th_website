Rails.application.config.middleware.use OmniAuth::Builder do
  # provider :twitter, ENV['TWITTER_KEY'], ENV['TWITTER_SECRET']

  # provider :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_SECRET'], scope: 'public_profile', info_fields: 'id,name,link'
  provider :facebook, Rails.application.secrets['FACEBOOK_APP_ID'], Rails.application.secrets['FACEBOOK_SECRET'],
           #scope: 'email,user_birthday,read_stream', display: 'popup'
  scope: 'public_profile,email', info_fields: 'id,name,link'
end