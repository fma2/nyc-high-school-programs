class SearchController < ApplicationController
  def search
		@results = PgSearch.multisearch(params["search"])
		p @results
	end

end
