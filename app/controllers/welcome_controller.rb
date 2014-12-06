class WelcomeController < ApplicationController
	def index
		gon.programs = Program.all
		gon.schools = School.all
	end

end
