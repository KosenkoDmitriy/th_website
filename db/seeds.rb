# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Credit.find_or_create_by(cost_in_cents: 99, credits: 25000)
Credit.find_or_create_by(cost_in_cents: 299, credits: 100000)
Credit.find_or_create_by(cost_in_cents: 599, credits: 350000)
Credit.find_or_create_by(cost_in_cents: 999, credits: 750000)

Game.find_or_create_by(title: "webgl", text: "support all browsers except ie", url: "http://th.webgl.shopomob.ru")
Game.find_or_create_by(title: "webplayer", text: "support all browsers except google chrome", url: "http://th.webplayer.shopomob.ru/WebPlayer.html")
Game.find_or_create_by(title: "webgl 512 MB", text: "support all browsers except ie", url: "http://th.webgl512.shopomob.ru")
Game.find_or_create_by(title: "webgl 1024 MB", text: "support all browsers except ie", url: "http://th.webgl1024.shopomob.ru")
Game.find_or_create_by(title: "webgl 256 MB", text: "support all browsers except ie", url: "http://th.webgl256.shopomob.ru")
Game.find_or_create_by(title: "webgl 128 MB", text: "support all browsers except ie", url: "http://th.webgl128.shopomob.ru")
