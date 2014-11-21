class CreateSchools < ActiveRecord::Migration
  def change
    create_table :schools do |t|
    	t.string :program_code
    	t.string :program_name
    	t.string :dbn
    	t.string :printed_school_name
    	t.string :interest_area
    	t.string :selection_method
    	t.string :selection_method_abbrevi
    	t.string :directory_page_
    	t.string :borough
    	t.string :urls

    	t.string :phone_number
    	t.string :grade_span_min
    	t.string :grade_span_max
    	t.string :primary_address_line_1
    	t.string :city
    	t.string :state_code
    	t.string :zip
    	t.string :school_type
    	t.string :latitude
    	t.string :longitude

      t.timestamps
    end
  end
end
