class CreateSchools < ActiveRecord::Migration
  def change
    create_table :schools do |t|
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
        t.text :se_services
        t.string :total_students
        t.text :program_highlights
        t.text :overview_paragraph
        t.string :website
        t.text :extracurricular_activities
        t.string :boro
        t.string :dbn
        t.string :school_name

        t.string :ontrack_year1_2013
        t.string :graduation_rate_2013
        t.string :college_career_rate_2013
        t.string :student_satisfaction_2013
        t.string :ontrack_year1_2012
        t.string :graduation_rate_2012
        t.string :student_satisfaction_2012
        t.string :ontrack_year1_historic_avg_similar_schls
        t.string :graduation_rate_historic_avg_similar_schl
        t.string :college_career_rate_historic_avg_similar_schls
        t.string :student_satisfaction_historic_avg_similar_schls
        t.string :quality_review_rating
        t.string :quality_review_year
        
      t.timestamps
    end
  end
end
