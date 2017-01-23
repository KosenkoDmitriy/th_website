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

ActiveRecord::Schema.define(version: 20161221171700) do

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_id",   null: false
    t.string   "resource_type", null: false
    t.integer  "author_id"
    t.string   "author_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
  add_index "active_admin_comments", ["namespace"], name: "index_active_admin_comments_on_namespace"
  add_index "active_admin_comments", ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"

  create_table "admin_users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "admin_users", ["email"], name: "index_admin_users_on_email", unique: true
  add_index "admin_users", ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true

  create_table "credits", force: :cascade do |t|
    t.string   "title"
    t.float    "cost_in_cents"
    t.float    "credits"
    t.datetime "dt"
    t.text     "text"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

# Could not dump table "games" because of following NoMethodError
#   undefined method `[]' for nil:NilClass

  create_table "login_histories", force: :cascade do |t|
    t.integer  "count"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "login_histories", ["user_id"], name: "index_login_histories_on_user_id"

  create_table "messages", force: :cascade do |t|
    t.string   "title"
    t.text     "text"
    t.integer  "interval",     default: 0
    t.boolean  "is_email",     default: true
    t.boolean  "is_sms",       default: true
    t.boolean  "is_published", default: true
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "orders", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "credit_id"
    t.string   "ip"
    t.string   "express_token"
    t.string   "express_payer_id"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.datetime "dt"
    t.string   "status",            default: "unpaid"
    t.string   "payment_type"
    t.string   "payment_type_help"
  end

  add_index "orders", ["credit_id"], name: "index_orders_on_credit_id"
  add_index "orders", ["user_id"], name: "index_orders_on_user_id"

  create_table "score_histories", force: :cascade do |t|
    t.float    "amount"
    t.integer  "user_id"
    t.integer  "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "score_histories", ["game_id"], name: "index_score_histories_on_game_id"
  add_index "score_histories", ["user_id"], name: "index_score_histories_on_user_id"

  create_table "simple_captcha_data", force: :cascade do |t|
    t.string   "key",        limit: 40
    t.string   "value",      limit: 6
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "simple_captcha_data", ["key"], name: "idx_key"

  create_table "th_login_histories", force: :cascade do |t|
    t.string   "platform"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "th_login_histories", ["user_id"], name: "index_th_login_histories_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "full_name"
    t.string   "email"
    t.string   "phone_number"
    t.string   "password"
    t.string   "confirm_password"
    t.float    "credits"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.string   "key"
    t.datetime "last_login_dt"
    t.string   "name"
    t.string   "location"
    t.string   "image_url"
    t.string   "url"
    t.string   "provider"
    t.string   "uid"
    t.string   "bt"
    t.boolean  "is_active",        default: true
    t.integer  "fw_attempts",      default: 1
    t.datetime "fw_dt"
    t.string   "acode"
    t.boolean  "is_subscribed",    default: true
    t.string   "key_invite"
  end

  add_index "users", ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true
  add_index "users", ["provider"], name: "index_users_on_provider"
  add_index "users", ["uid"], name: "index_users_on_uid"

end
