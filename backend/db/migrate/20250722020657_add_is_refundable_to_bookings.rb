class AddIsRefundableToBookings < ActiveRecord::Migration[8.0]
  def change
    add_column :bookings, :is_refundable, :boolean, default: false
  end
end
