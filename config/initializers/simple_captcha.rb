SimpleCaptcha.setup do |sc|
  # default: 100x28
  sc.image_size = '220x35'

  # default: 5
  sc.length = 6

  sc.image_style = 'th'
  sc.add_image_style('th', [
     "-background '#f7e397'",
     "-fill 'darkred'",
     "-border 0",
     "-bordercolor '#E0E2E3'"])
  # default: simply_blue
  # possible values:
  # 'embosed_silver',
  # 'simply_red',
  # 'simply_green',
  # 'simply_blue',
  # 'distorted_black',
  # 'all_black',
  # 'charcoal_grey',
  # 'almost_invisible'
  # 'random'
  sc.image_style = 'th'

  # default: low
  # possible values: 'low', 'medium', 'high', 'random'
  sc.distortion = 'medium'

  # default: medium
  # possible values: 'none', 'low', 'medium', 'high'
  sc.implode = 'low'
end