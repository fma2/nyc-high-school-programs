class CreatePrograms < ActiveRecord::Migration
  def change
    create_table :programs do |t|
    	t.string :program_code
    	t.string :program_name
    	t.string :dbn
    	t.string :school_name
    	t.string :interest_area
    	t.string :selection_method
    	t.string :selection_method_abbrevi
    	t.string :directory_page_
    	t.string :borough
    	t.string :urls

    	t.references :school
      t.timestamps
    end
  end
end
