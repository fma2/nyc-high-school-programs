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

ActiveRecord::Schema.define(version: 20141206192523) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "pg_search_documents", force: true do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "programs", force: true do |t|
    t.string   "program_code"
    t.string   "program_name"
    t.string   "dbn"
    t.string   "printed_school_name"
    t.string   "interest_area"
    t.string   "selection_method"
    t.string   "selection_method_abbrevi"
    t.string   "directory_page_"
    t.string   "borough"
    t.string   "urls"
    t.integer  "school_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "schools", force: true do |t|
    t.string   "phone_number"
    t.string   "grade_span_min"
    t.string   "grade_span_max"
    t.string   "primary_address_line_1"
    t.string   "city"
    t.string   "state_code"
    t.string   "zip"
    t.string   "school_type"
    t.string   "latitude"
    t.string   "longitude"
    t.text     "se_services"
    t.string   "total_students"
    t.text     "program_highlights"
    t.text     "overview_paragraph"
    t.string   "website"
    t.text     "extracurricular_activities"
    t.string   "boro"
    t.string   "dbn"
    t.string   "school_name"
    t.string   "ontrack_year1_2013"
    t.string   "graduation_rate_2013"
    t.string   "college_career_rate_2013"
    t.string   "student_satisfaction_2013"
    t.string   "ontrack_year1_2012"
    t.string   "graduation_rate_2012"
    t.string   "student_satisfaction_2012"
    t.string   "ontrack_year1_historic_avg_similar_schls"
    t.string   "graduation_rate_historic_avg_similar_schl"
    t.string   "college_career_rate_historic_avg_similar_schls"
    t.string   "student_satisfaction_historic_avg_similar_schls"
    t.string   "quality_review_rating"
    t.string   "quality_review_year"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
