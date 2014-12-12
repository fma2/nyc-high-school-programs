class SchoolsController < ApplicationController
	# skip_before_action :verify_authenticity_token
	def index
		# gon.schools = School.all
		@schools = School.all
		@geojson = Array.new
		@schools.each do |school|
			@geojson << {
				type: 'Feature',
				geometry: { 
					type: 'Point',
					coordinates: [school.longitude, school.latitude]
				},
				properties: {
					name: school.school_name,
					address: school.primary_address_line_1,
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