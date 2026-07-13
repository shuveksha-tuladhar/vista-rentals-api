# frozen_string_literal: true

class AddBookingToReviews < ActiveRecord::Migration[8.0]
  def change
    add_reference :reviews, :booking, null: true, foreign_key: true, index: { unique: true }
  end
end
