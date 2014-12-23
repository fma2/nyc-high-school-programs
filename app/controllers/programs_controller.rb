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
end