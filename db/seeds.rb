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

game=Game.find_or_create_by(order_id: 10, is_skipped_login: true, fid:"texas_holdem_foldup", title: "Texas Holdem Foldup", offsetX:"0px", offsetY:"0px", width:'100%', height:'600px', text: '', url: "https://game.yourplaceforfun.com")
game.text = "<p class='big text-center'> The most popular card game in the world just got better and more thrilling! With Texas Hold’em Fold Up, you play Texas Hold’em against virtual robots. If any of the virtual robots fold during the hand they fold up to show you their hold cards, providing you with a lot more information, and strategies. </p> <p class='big text-center'> Every time that a robot folds up, the odds change, the excitement changes, and how you play your hand changes. This additional information should make it easier to determine if you should fold, check, or raise your hand. </p> <p></p> <div class='boxsection_01'> <h2 class='title'>Instructions</h2> <div class='box_left01'> <!--<div class='title_sec'><h3>Instructions</h3></div>--> <div class='desc'> <p class='big'>1. If you want win the bonus - click on the button 'bonus bet' and make any bet before clicking on the button 'start game'.</p> <p class='big'>2. Make the bet and play Texas Hold'em Fold Up (sm) against five other virtual players.</p> <p class='big'>3. If you win the pot you get BOTH the pot and the TEXAS HOLD EM FOLD UP BONUS. If you split the pot you get half of the TEXAS HOLD EM FOLD UP BONUS</p> <p class='big'>4. You choose the amount of your bet for each hand and the five other virtual players will match your bet, creating the pot.</p> </div> </div> <div class='box_right01'> <!--<div class='title_sec'><h3>This is other half</h3></div>--> <div class='desc'> <p class='big'>5. If any of the virtual players fold, they will fold the cards face up, showing you what they folded.</p> <p class='big'>6. If you choose to call, raise, or go ALL IN, you can only bet the maximium amount of credits that you have displayed at the start of the game in the CREDITS window.</p> <p class='big'>7. The button moves each hand. You will be the first to act on the first hand, and last to act on the sixth, and so on.</p> <p class='big'>8. All virtual players have the same amount of credits you do.</p> </div> </div> <div class='clr'></div> </div>"
game.save
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
game=Game.find_or_create_by(order_id: 110, is_embedded: false, fid:"lol", title: "League of Legends", offsetX:"-40px", offsetY:"30px", width:'1024px', height:'772px', text: '', url: "https://lol.yourplaceforfun.com", fb_url: "https://apps.facebook.com/1085475714893018/")
game.text = "<ul style='color:black'>Supported browsers on:<li><b>Windows:</b> Firefox, Safari, Internet Explorer, Opera v.36 or less.</li><li> <b>Mac OS X:</b> Firefox, Safari</li></ul>"
game.save