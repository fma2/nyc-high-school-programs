class ProgramsController < ApplicationController
	def search
		@results = Program.program_search(params["search"])
	end

	def map_results
		to_map = []
		results = Program.program_search(params["search"])
		results.each do |program|
			to_map << program.school
		end
		gon.results_map = to_map
	end

	def index
		@schools = School.all
		@geojson = Array.new
		@schools.each do |school|
			school.programs.each do |program|
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
						boro: school.boro,
						type: school.school_type,
						total_students: school.total_students,
						program_highlights: school.program_highlights,
						overview_paragraph: school.overview_paragraph,
						website: school.website,
						dbn: school.dbn,
						grade_span_min: school.grade_span_min,
						grade_span_max: school.grade_span_max,
						program_name: program.program_name,
						interest_area: program.interest_area,
						selection_method: program.selection_method,
						selection_method_abbrevi: program.selection_method_abbrevi,
						urls: program.urls,
						:'marker-color' => '#00607d',
						:'marker-symbol' => 'circle',
						:'marker-size' => 'medium'
					}
				}
			end
		end
		respond_to do |format|
			format.html
			format.json { render json: @geojson }
		end
	end
end