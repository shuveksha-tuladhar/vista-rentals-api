class CreatePropertySafetyNotes < ActiveRecord::Migration[8.0]
  def change
    create_table :property_safety_notes do |t|
      t.references :property, null: false, foreign_key: true
      t.text :notes
      t.boolean :is_active, default: true

      t.timestamps
    end
  end
end
