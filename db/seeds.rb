# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


require 'net/http'
require 'uri'
require 'json'

def open(url)
	Net::HTTP.get(URI.parse(url))
end

School.destroy_all

high_school_directory_2014_15 = JSON.parse(open('http://data.cityofnewyork.us/resource/n3p6-zve2.json'))
high_school_program_data = JSON.parse(open('http://data.cityofnewyork.us/resource/mreg-rk5p.json'))

# high_school_program_data.each do |school|
# 		School.create(program_code: school["program_code"], program_name: school["program_name"], dbn: school["dbn"], printed_school_name: school["printed_school_name"], interest_area: school["interest_area"], selection_method: school["selection_method"], selection_method_abbrevi: school["selection_method_abbreviated"], directory_page_: school["directory_page_"], borough: school["borough"], urls: school["urls"] )
# end

# high_school_directory_2014_15.each do |school|
# 	schools_to_change = School.where(dbn: school["dbn"])
# 	if schools_to_change != nil
# 		schools_to_change.each do |x|
# 			x.update(phone_number: school["phone_number"], grade_span_min: school["grade_span_min"], grade_span_max: school["grade_span_max"], primary_address_line_1: school["primary_address_line_1"], city: school["city"], state_code: school["state_code"], zip: school["zip"], school_type: school["school_type"], latitude: school["location_1"]["latitude"], longitude: school["location_1"]["longitude"])
# 			x.save
# 		end
# 	end
# end

high_school_directory_2014_15.each do |school|
	School.create(phone_number: school["phone_number"], grade_span_min: school["grade_span_min"], grade_span_max: school["grade_span_max"], primary_address_line_1: school["primary_address_line_1"], city: school["city"], state_code: school["state_code"], zip: school["zip"], school_type: school["school_type"], latitude: school["location_1"]["latitude"], longitude: school["location_1"]["longitude"], se_services: school["se_services"], total_students: school["total_students"], program_highlights: school["program_highlights"], overview_paragraph: school["overview_paragraph"], website: school["website"], extracurricular_activities: school["extracurricular_activities"], boro: school["boro"])			
end