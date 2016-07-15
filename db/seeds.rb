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

Game.find_or_create_by(order_id: 10, is_skipped_login: true, fid:"texas_holdem_foldup", title: "Texas Holdem Foldup", text: "", url: "https://game.yourplaceforfun.com")
Game.find_or_create_by(order_id: 20, fid:"video_poker_jack", title: "Video Poker Jack", text: "", url: "/video_poker_jack/index.html")
Game.find_or_create_by(order_id: 50, fid:"spider_solitaire", title: "Spider Solitaire", text: "", url: "/spider_solitaire/index.html")
Game.find_or_create_by(order_id: 80, fid:"slot_soccer", title: "Slot Machine Ulimate Soccer", text: "", url: "/slot_soccer/index.html")
Game.find_or_create_by(order_id: 60, fid:"freecell_solitaire", title: "Free Cell Solitaire", text: "", url: "/freecell_solitaire/index.html")
Game.find_or_create_by(order_id: 70, fid:"black_jack", title: "Black Jack", text: "", url: "/black_jack/index.html")
Game.find_or_create_by(order_id: 40, fid:"bingo", title: "Bingo", text: "", url: "/bingo/index.html")
Game.find_or_create_by(order_id: 80, fid:"baccarat", title: "Baccarat", text: "", url: "/baccarat/index.html")
Game.find_or_create_by(order_id: 30, fid:"3d_roulette", title: "3D Roulette", text: "", url: "/3d_roulette/index.html")
# Game.find_or_create_by(order_id: 110, fid:"slot_ramses", title: "Slot Ramses Treasure", text: "", url: "/slot_ramses/index.html")
Game.find_or_create_by(order_id: 90, fid:"candy_super_lines", title: "Candy Super Lines", text: "", url: "/candy_super_lines/index.html")
Game.find_or_create_by(order_id: 100, fid:"angry_finches", title: "Angry Finches", text: "", url: "/angry_finches/index.html")
