class CreateProperties < ActiveRecord::Migration[8.0]
  def change
    create_table :properties do |t|
      t.references :user, null: false, foreign_key: true
      t.string :address
      t.string :city
      t.string :state
      t.string :country
      t.string :zipcode
      t.string :name
      t.text :description
      t.string :price
      t.integer :bedrooms
      t.integer :baths
      t.integer :maxGuest

      t.timestamps
    end
  end
end
