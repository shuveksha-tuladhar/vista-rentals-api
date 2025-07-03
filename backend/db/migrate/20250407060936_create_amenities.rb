class CreateAmenities < ActiveRecord::Migration[8.0]
  def change
    create_table :amenities do |t|
      t.string :name
      t.boolean :isActive

      t.timestamps
    end
  end
end
