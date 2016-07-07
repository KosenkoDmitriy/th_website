# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160707092036) do

  create_table "credits", force: :cascade do |t|
    t.string   "title"
    t.float    "cost_in_cents"
    t.float    "credits"
    t.datetime "dt"
    t.text     "text"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "games", force: :cascade do |t|
    t.string   "title"
    t.text     "text"
    t.text     "url"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "fid"
    t.boolean  "is_skipped_login"
  end

  create_table "orders", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "credit_id"
    t.string   "ip"
    t.string   "express_token"
    t.string   "express_payer_id"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.datetime "dt"
    t.string   "status",           default: "unpaid"
  end

  add_index "orders", ["credit_id"], name: "index_orders_on_credit_id"
  add_index "orders", ["user_id"], name: "index_orders_on_user_id"

  create_table "simple_captcha_data", force: :cascade do |t|
    t.string   "key",        limit: 40
    t.string   "value",      limit: 6
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "simple_captcha_data", ["key"], name: "idx_key"

  create_table "users", force: :cascade do |t|
    t.string   "full_name"
    t.string   "email"
    t.string   "phone_number"
    t.string   "password"
    t.string   "confirm_password"
    t.float    "credits"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "key"
    t.datetime "last_login_dt"
    t.string   "name"
    t.string   "location"
    t.string   "image_url"
    t.string   "url"
    t.string   "provider"
    t.string   "uid"
    t.string   "bt"
  end

  add_index "users", ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true
  add_index "users", ["provider"], name: "index_users_on_provider"
  add_index "users", ["uid"], name: "index_users_on_uid"

end
