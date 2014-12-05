class SchoolsController < ApplicationController
	# skip_before_action :verify_authenticity_token
	def index
		gon.schools = School.all
	end


end