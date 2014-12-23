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
high_school_program_data_2014_15 = JSON.parse(open('http://data.cityofnewyork.us/resource/mreg-rk5p.json'))
high_school_performance_2014_15 = JSON.parse(open('https://data.cityofnewyork.us/resource/xahu-rkwn.json'))

high_school_directory_2014_15.each do |school|
	school = School.create(phone_number: school["phone_number"], grade_span_min: school["grade_span_min"], grade_span_max: school["grade_span_max"], primary_address_line_1: school["primary_address_line_1"], city: school["city"], state_code: school["state_code"], zip: school["zip"], school_type: school["school_type"], latitude: school["location_1"]["latitude"], longitude: school["location_1"]["longitude"], se_services: school["se_services"], total_students: school["total_students"], program_highlights: school["program_highlights"], overview_paragraph: school["overview_paragraph"], website: school["website"], extracurricular_activities: school["extracurricular_activities"], boro: school["boro"], dbn: school["dbn"], school_name: school["school_name"])
	if school.school_type == nil
		school.update(school_type: "No specific type")
		school.save
	end
end

# high_school_performance_2014_15.each do |school|
# 	school = School.find_by(dbn:school["dbn"])
# 	if school
# 		school.update()
# end

high_school_program_data_2014_15.each do |program|
	school = School.find_by(dbn: program["dbn"])
	if school
		school.programs << Program.create(program_code: program["program_code"], program_name: program["program_name"], dbn: program["dbn"], printed_school_name: program["printed_school_name"], interest_area: program["interest_area"], selection_method: program["selection_method"], selection_method_abbrevi: program["selection_method_abbreviated"], directory_page_: program["directory_page_"], borough: program["borough"], urls: program["urls"])
	end
end