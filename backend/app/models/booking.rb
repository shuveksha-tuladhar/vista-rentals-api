# frozen_string_literal: true

# rubocop:disable Style/Documentation
class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :property
  has_one :review, dependent: :destroy

  validates :start_date, :end_date, presence: true
  validate :end_date_after_start_date
  validate :no_date_overlap, on: :create
  validates :payment_status, inclusion: { in: %w[pending complete failed], allow_nil: true }

  private

  def no_date_overlap
    return if start_date.blank? || end_date.blank?

    overlapping = Booking.where(property_id: property_id, payment_status: 'complete')
                         .where('start_date < ? AND end_date > ?', end_date, start_date)

    errors.add(:base, 'Property is already booked for the selected dates') if overlapping.exists?
  end

  def end_date_after_start_date
    return if end_date.blank? || start_date.blank?

    return unless end_date <= start_date

    errors.add(:end_date, 'must be after the start date')
  end
end
# rubocop:enable Style/Documentation
