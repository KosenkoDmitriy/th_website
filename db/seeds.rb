# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')

Credit.find_or_create_by(cost_in_cents: 99, credits: 1000000, title: "1M credits")
Credit.find_or_create_by(cost_in_cents: 299, credits: 2000000, title: "2M credits")
Credit.find_or_create_by(cost_in_cents: 599, credits: 8000000, title: "8M credits")
Credit.find_or_create_by(cost_in_cents: 999, credits: 10000000, title: "10M credits")

Game.find_or_create_by(order_id: 10, is_skipped_login: true, fid:"texas_holdem_foldup", title: "Texas Holdem Foldup", offsetX:"0px", offsetY:"0px", width:'100%', height:'600px', text: '', url: "https://game.yourplaceforfun.com")
Game.find_or_create_by(order_id: 20, fid:"video_poker_jack", title: "Video Poker Jack", text: '', url: "/video_poker_jack/index.html")
Game.find_or_create_by(order_id: 50, fid:"spider_solitaire", title: "Spider Solitaire", offsetX:'', offsetY:'', width:'100%', height:'672px', text: '', url: "/spider_solitaire/index.html")
Game.find_or_create_by(order_id: 80, fid:"slot_soccer", title: "Slot Machine Ulimate Soccer", text: '', url: "/slot_soccer/index.html")
Game.find_or_create_by(order_id: 60, fid:"freecell_solitaire", title: "Free Cell Solitaire", offsetX:"", offsetY:"", width:'100%', height:'684px', text: '', url: "/freecell_solitaire/index.html")
Game.find_or_create_by(order_id: 70, fid:"black_jack", title: "Black Jack", text: '', url: "/black_jack/index.html")
Game.find_or_create_by(order_id: 40, fid:"bingo", title: "Bingo", text: '', url: "/bingo/index.html")
Game.find_or_create_by(order_id: 80, fid:"baccarat", title: "Baccarat", text: '', url: "/baccarat/index.html")
Game.find_or_create_by(order_id: 30, fid:"3d_roulette", title: "3D Roulette", offsetX:"", offsetY:"", width:'100%', height:'753px', text: '', url: "/3d_roulette/index.html")
# Game.find_or_create_by(order_id: 110, fid:"slot_ramses", title: "Slot Ramses Treasure", text: '', url: "/slot_ramses/index.html")
Game.find_or_create_by(order_id: 90, fid:"candy_super_lines", title: "Candy Super Lines", offsetX:"-175px", offsetY:"30px", width:'1296px', height:'754px', text: '', url: "/candy_super_lines/index.html")
Game.find_or_create_by(order_id: 100, fid:"angry_finches", title: "Angry Finches", offsetX:"-40px", offsetY:"30px", width:'1024px', height:'772px', text: '', url: "/angry_finches/index.html")
