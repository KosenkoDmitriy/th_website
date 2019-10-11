class CreateScoreHistories < ActiveRecord::Migration
  def change
    create_table :score_histories do |t|
      t.float :amount
      t.belongs_to :user, index: true
      t.belongs_to :game, index: true
      #t.has_many :users, through: ScoreHistory
      t.timestamps null: falsecr
    end
  end
end
