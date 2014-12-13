class Program < ActiveRecord::Base
	include PgSearch
	belongs_to :school

	pg_search_scope :program_search, :against => [:program_name, :interest_area]       
end
