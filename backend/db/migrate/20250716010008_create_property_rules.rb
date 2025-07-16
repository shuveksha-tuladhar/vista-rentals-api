class CreatePropertyRules < ActiveRecord::Migration[8.0]
  def change
    create_table :property_rules do |t|
      t.references :property, null: false, foreign_key: true
      t.text :rule
      t.boolean :is_active, default: true

      t.timestamps
    end
  end
end
