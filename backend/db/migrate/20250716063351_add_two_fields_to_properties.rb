class AddTwoFieldsToProperties < ActiveRecord::Migration[8.0]
  def change
    add_column :properties, :title, :string
    add_column :properties, :property_type, :string
  end
end
