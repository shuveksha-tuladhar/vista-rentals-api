class AddPaymentFieldsToBookings < ActiveRecord::Migration[8.0]
  def change
    add_column :bookings, :payment_status, :string
    add_column :bookings, :payment_token, :string
  end
end
