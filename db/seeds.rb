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
