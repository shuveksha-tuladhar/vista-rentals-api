class CreatePropertyImages < ActiveRecord::Migration[8.0]
  def change
    create_table :property_images do |t|
      t.references :property, null: false, foreign_key: true
      t.string :url

      t.timestamps
    end
  end
end
