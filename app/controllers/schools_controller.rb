class SchoolsController < ApplicationController
	# skip_before_action :verify_authenticity_token
	def index
		# @schools = School.all
		gon.schools = School.all
	end


end