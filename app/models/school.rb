class School < ActiveRecord::Base
	include PgSearch

	has_many :programs
	multisearchable :against => [:school_name, :school_type]       

end
