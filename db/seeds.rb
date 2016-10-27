# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
mail = 'bogach_89@mail.ru'
password = 'qwerty123456'
AdminUser.create!(email: mail, password: password, password_confirmation: password) if AdminUser.exists?(email:mail)

credit=Credit.find_or_create_by(id:1)
credit.update_columns(cost_in_cents: 99, credits:500000, title: '500K credits')
credit=Credit.find_or_create_by(id:2)
credit.update_columns(cost_in_cents: 299, credits:2500000, title: '2.5M credits')
credit=Credit.find_or_create_by(id:3)
credit.update_columns(cost_in_cents: 399, credits:4000000, title: '4M credits')
credit=Credit.find_or_create_by(id:4)
credit.update_columns(cost_in_cents: 599, credits:5000000, title: '5M credits')

texas_holdem_foldup = "texas_holdem_foldup"
video_poker_jack = "video_poker_jack"
spider_solitaire = "spider_solitaire"
slot_soccer = "slot_soccer"
freecell_solitaire = "freecell_solitaire"
black_jack = "black_jack"
bingo = "bingo"
baccarat = "baccarat"
_3d_roulette = "3d_roulette"
candy_super_lines = "candy_super_lines"
angry_finches = "angry_finches"
lol = "lol"

game=Game.find_or_create_by(order_id: 10, is_skipped_login: true, fid:texas_holdem_foldup, title: "Texas Holdem Foldup", offsetX:"0px", offsetY:"0px", width:'100%', height:'600px', text: '', url: "https://game.yourplaceforfun.com")
game.update_columns(text: "<p class='big text-center'> The most popular card game in the world just got better and more thrilling! With Texas Hold’em Fold Up, you play Texas Hold’em against virtual robots. If any of the virtual robots fold during the hand they fold up to show you their hold cards, providing you with a lot more information, and strategies. </p> <p class='big text-center'> Every time that a robot folds up, the odds change, the excitement changes, and how you play your hand changes. This additional information should make it easier to determine if you should fold, check, or raise your hand. </p> <p></p> <div class='boxsection_01'> <h2 class='title'>Instructions</h2> <div class='box_left01'> <!--<div class='title_sec'><h3>Instructions</h3></div>--> <div class='desc'> <p class='big'>1. If you want win the bonus - click on the button 'bonus bet' and make any bet before clicking on the button 'start game'.</p> <p class='big'>2. Make the bet and play Texas Hold'em Fold Up (sm) against five other virtual players.</p> <p class='big'>3. If you win the pot you get BOTH the pot and the TEXAS HOLD EM FOLD UP BONUS. If you split the pot you get half of the TEXAS HOLD EM FOLD UP BONUS</p> <p class='big'>4. You choose the amount of your bet for each hand and the five other virtual players will match your bet, creating the pot.</p> </div> </div> <div class='box_right01'> <!--<div class='title_sec'><h3>This is other half</h3></div>--> <div class='desc'> <p class='big'>5. If any of the virtual players fold, they will fold the cards face up, showing you what they folded.</p> <p class='big'>6. If you choose to call, raise, or go ALL IN, you can only bet the maximium amount of credits that you have displayed at the start of the game in the CREDITS window.</p> <p class='big'>7. The button moves each hand. You will be the first to act on the first hand, and last to act on the sixth, and so on.</p> <p class='big'>8. All virtual players have the same amount of credits you do.</p> </div> </div> <div class='clr'></div> </div>")

Game.find_or_create_by(order_id: 20, fid:video_poker_jack, title: "Video Poker Jack", text: '', url: "/video_poker_jack/index.html")
Game.find_or_create_by(order_id: 50, fid:spider_solitaire, title: "Spider Solitaire", text: '', url: "/spider_solitaire/index.html")
Game.find_or_create_by(order_id: 80, fid:slot_soccer, title: "Slot Machine Ulimate Soccer", text: '', url: "/slot_soccer/index.html")
Game.find_or_create_by(order_id: 60, fid:freecell_solitaire, title: "Free Cell Solitaire", text: '', url: "/freecell_solitaire/index.html")
Game.find_or_create_by(order_id: 70, fid:black_jack, title: "Black Jack", text: '', url: "/black_jack/index.html")
Game.find_or_create_by(order_id: 40, fid:bingo, title: "Bingo", text: '', url: "/bingo/index.html")
Game.find_or_create_by(order_id: 80, fid:baccarat, title: "Baccarat", text: '', url: "/baccarat/index.html")
Game.find_or_create_by(order_id: 30, fid:_3d_roulette, title: "3D Roulette", offsetX:"", offsetY:"", width:'100%', height:'753px', text: '', url: "/3d_roulette/index.html")
# Game.find_or_create_by(order_id: 110, fid:"slot_ramses", title: "Slot Ramses Treasure", text: '', url: "/slot_ramses/index.html")
Game.find_or_create_by(order_id: 90, fid:candy_super_lines, title: "Candy Super Lines", offsetX:"-175px", offsetY:"30px", width:'1296px', height:'754px', text: '', url: "/candy_super_lines/index.html")

Game.find_or_create_by(order_id: 100, fid:angry_finches, title: "Angry Finches", text: '', url: "/angry_finches/index.html")

game=Game.find_or_create_by(order_id: 110, is_embedded: false, fid:lol, title: "League of Legends", offsetX:"-40px", offsetY:"30px", width:'1024px', height:'772px', text: '', url: "https://lol.yourplaceforfun.com", fb_url: "https://apps.facebook.com/1085475714893018/")
game.update_columns(text: "<ul style='color:black'>Supported browsers on:<li><b>Windows:</b> Firefox, Safari, Internet Explorer, Opera v.36 or less.</li><li> <b>Mac OS X:</b> Firefox, Safari</li></ul>")



game=Game.find_by(fid:video_poker_jack)
game.update_columns(offsetX:'', offsetY:'', width:'100%', height:'568px')

game=Game.find_by(fid:spider_solitaire)
game.update_columns(offsetX:'', offsetY:'', width:'100%', height:'568px')

game=Game.find_by(fid:freecell_solitaire)
game.update_columns(offsetX:'', offsetY:'', width:'100%', height:'568px')

game=Game.find_by(fid:angry_finches)
game.update_columns(offsetX:'', offsetY:'', width:'99%', height:'763.5px')

game=Game.find_by(fid:candy_super_lines)
game.update_columns(offsetX:'', offsetY:'', width:'100%', height:'530px')


# adding game short description
game=Game.find_by(fid:candy_super_lines)
game.update_columns(stext:'Play our version of one the most popular games among all age groups.')

game=Game.find_by(fid:video_poker_jack)
game.update_columns(stext:'Increase your odds of winning by making Jacks Or Better for your best poker hands.')

game=Game.find_by(fid:black_jack)
game.update_columns(stext:'Bet up to 1,000 credits, split and double down on this great casino game.')

game=Game.find_by(fid:_3d_roulette)
game.update_columns(stext:'Our 3D Roulette game is one of the best you will find online.')

game=Game.find_by(fid:bingo)
game.update_columns(stext:'Change it up a bit by playing 90 number bingo like they do outside of the USA.')

game=Game.find_by(fid:baccarat)
game.update_columns(stext:'Bet like a high roller with our version of Baccarat.')

game=Game.find_by(fid:slot_soccer)
game.update_columns(stext:'Watch as your favorite soccer team spins you to victory.')

game=Game.find_by(fid:angry_finches)
game.update_columns(stext:'We have created our version of one the most popular online games.  Launch your way to victory with this very challenging game.')

game=Game.find_by(fid:freecell_solitaire)
game.update_columns(stext:'Anyone can win at solitaire, but can you master the challenges of Free Cell Solitaire?')

game=Game.find_by(fid:spider_solitaire)
game.update_columns(stext:'This game is sure to challenge your skill...and your patience.')

game=Game.find_by(fid:texas_holdem_foldup)
game.update_columns(stext:'Gain the advantage by seeing what your opponent folds before you bet with this exciting version of the most popular card game in decades.')

game=Game.find_by(fid:lol)
game.update_columns(stext:'Looking for action? Play this exciting battle game.')


# test data
(1..10).each do |i|
  User.create(email:"s#{i}@s.ru",password:"123")
end
User.take(10).each do |user|
  Game.all.each do |game|
    (1..2).each do
      ScoreHistory.create(user:user, game:game, amount:rand(10..1000))
      ScoreHistory.create(user:user, game:game, amount:rand(10..1000), created_at: DateTime.now.months_ago(1))
    end
  end
end

User.take(10).each do |user|
  (1..28).each do |day|
    LoginHistory.create(user:user, count:rand(1..5), created_at:DateTime.new(DateTime.now.year, rand(1..12), day))
  end
end
