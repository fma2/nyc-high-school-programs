class Program < ActiveRecord::Base
	include PgSearch
	belongs_to :school

	multisearchable :against => [:program_name, :interest_area]       

end
