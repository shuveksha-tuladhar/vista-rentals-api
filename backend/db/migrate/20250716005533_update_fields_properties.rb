class UpdateFieldsProperties < ActiveRecord::Migration[8.0]
  def change
    rename_column :properties, :maxGuest, :max_guests
    add_column :properties, :cancellation_policy, :text
    add_column :properties, :coordinates_latitude, :string
    add_column :properties, :coordinates_longitude, :string
  end
end
