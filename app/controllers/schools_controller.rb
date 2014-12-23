class SchoolsController < ApplicationController
	def index
		@schools = School.all
		@geojson = Array.new
		@schools.each do |school|
			@programs = school.programs
			school_programs = []
			@programs.each do |program|
				school_programs << {
					program_name: program.program_name,
					interest_area: program.interest_area,
					selection_method: program.selection_method,
					selection_method_abbrevi: program.selection_method_abbrevi,
					urls: program.urls,
					}
			end
			@geojson << {
				type: 'Feature',
				geometry: { 
					type: 'Point',
					coordinates: [school.longitude, school.latitude]
				},
				properties: {
					name: school.school_name,
					address: school.primary_address_line_1,
					zip: school.zip,
					phone: school.phone_number,
					boro: school.boro,
					type: school.school_type,
					total_students: school.total_students,
					program_highlights: school.program_highlights,
					overview_paragraph: school.overview_paragraph,
					website: school.website,
					dbn: school.dbn,
					grade_span_min: school.grade_span_min,
					grade_span_max: school.grade_span_max,
					ontrack_year1_2013: school.ontrack_year1_2013,
        	graduation_rate_2013: school.graduation_rate_2013,
        	college_career_rate_2013: school.college_career_rate_2013,
        	student_satisfaction_2013: school.student_satisfaction_2013,
        	ontrack_year1_2012: school.ontrack_year1_2012,
        	graduation_rate_2012: school.graduation_rate_2012,
        	student_satisfaction_2012: school.student_satisfaction_2012,
        	ontrack_year1_historic_avg_similar_schls: school.ontrack_year1_historic_avg_similar_schls,
        	graduation_rate_historic_avg_similar_schl: school.graduation_rate_historic_avg_similar_schl,
        	college_career_rate_historic_avg_similar_schls: school.college_career_rate_historic_avg_similar_schls,
        	student_satisfaction_historic_avg_similar_schls: school.student_satisfaction_historic_avg_similar_schls,
        	quality_review_rating: school.quality_review_rating,
        	quality_review_year: school.quality_review_year,
					programs: school_programs,
					:'marker-color' => '#00607d',
      		:'marker-symbol' => 'circle',
      		:'marker-size' => 'medium'
				}
			}
		end
		respond_to do |format|
			format.html
			format.json { render json: @geojson }
		end
	end
end