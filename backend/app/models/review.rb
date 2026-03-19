# frozen_string_literal: true

# rubocop:disable Style/Documentation
class Review < ApplicationRecord
  belongs_to :user
  belongs_to :property, touch: :reviews_changed_at
  belongs_to :booking, optional: true

  validates :booking, presence: true, on: :create
  validates :booking_id, uniqueness: { allow_nil: true, message: 'has already been reviewed' }
  validates :review, presence: true
  validates :rating, presence: true,
                     numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 5 }

  validate :booking_matches_property, if: -> { booking.present? && property_id.present? }
  validate :booking_matches_user, if: -> { booking.present? && user_id.present? }

  private

  def booking_matches_property
    return if booking.property_id == property_id

    errors.add(:booking_id, 'must belong to the selected property')
  end

  def booking_matches_user
    return if booking.user_id == user_id

    errors.add(:booking_id, 'must belong to the reviewing user')
  end
end
# rubocop:enable Style/Documentation
