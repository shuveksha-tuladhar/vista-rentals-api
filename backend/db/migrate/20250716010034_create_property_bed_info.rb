class CreatePropertyBedInfo < ActiveRecord::Migration[8.0]
  def change
    create_table :property_bed_infos do |t|
      t.references :property, null: false, foreign_key: true
      t.string :room
      t.string :bed_type
      t.boolean :is_active, default: true

      t.timestamps
    end
  end
end
