class AddIndexToBookingsDates < ActiveRecord::Migration[8.0]
  def change
    add_index :bookings, [:property_id, :start_date, :end_date], name: "index_bookings_on_property_id_start_date_end_date"
  end
end
