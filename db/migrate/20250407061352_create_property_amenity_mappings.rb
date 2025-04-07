class CreatePropertyAmenityMappings < ActiveRecord::Migration[8.0]
  def change
    create_table :property_amenity_mappings do |t|
      t.references :property, null: false, foreign_key: true
      t.references :amenity, null: false, foreign_key: true

      t.timestamps
    end
  end
end
