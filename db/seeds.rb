# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Credit.find_or_create_by(cost_in_cents: 99, credits: 1000000)
Credit.find_or_create_by(cost_in_cents: 299, credits: 2000000)
Credit.find_or_create_by(cost_in_cents: 599, credits: 8000000)
Credit.find_or_create_by(cost_in_cents: 999, credits: 10000000)

webgl_text = "if any problems - reload page (support all browsers except internet explorer)"
webplayer_text = "if any problems - reload page (support all browsers except google chrome)"
# Game.find_or_create_by(title: "webgl 64 MB", text: webgl_text, url: "http://th.webgl64.shopomob.ru")
# Game.find_or_create_by(title: "webgl 128 MB", text: webgl_text, url: "http://th.webgl128.shopomob.ru")
# Game.find_or_create_by(title: "webgl 256 MB", text: webgl_text, url: "http://th.webgl256.shopomob.ru")
# Game.find_or_create_by(title: "webgl 512 MB", text: webgl_text, url: "http://th.webgl512.shopomob.ru")
# Game.find_or_create_by(title: "webgl 1024 MB", text: webgl_text, url: "http://th.webgl1024.shopomob.ru")
# Game.find_or_create_by(title: "webplayer", text: webplayer_text, url: "http://th.webplayer.shopomob.ru/WebPlayer.html")
Game.find_or_create_by(fid:"video_poker_jack", title: "Video Poker Jack", text: "", url: "/video_poker_jack/index.html")
Game.find_or_create_by(fid:"spider_solitaire", title: "Spider Solitaire", text: "", url: "/spider_solitaire/index.html")
