require "rails_helper"

RSpec.describe Game, :type => :model do
  it 'create item' do
    game = Game.create(fid: 'texas_holdem_foldup')
    expect(game.fid).to eq('texas_holdem_foldup')
  end
  after(:all) { Game.destroy_all }
end
