# frozen_string_literal: true

# rubocop:disable Style/Documentation
class ReviewsController < ApplicationController
  # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
  def create
    booking = current_user.bookings.find_by(id: review_params[:booking_id])
    return render json: { error: 'Booking not found' }, status: :not_found unless booking

    if booking.property_id != review_params[:property_id].to_i
      return render json: { error: 'Booking does not match the selected property' }, status: :unprocessable_entity
    end

    unless booking.payment_status == 'complete' && booking.end_date.present? && booking.end_date < Time.current
      return render json: { error: 'Booking is not eligible for review yet' }, status: :unprocessable_entity
    end

    review = Review.new(
      review_params.except(:booking_id, :property_id).merge(
        user_id: current_user.id,
        property_id: booking.property_id,
        booking: booking
      )
    )

    if review.save
      render json: review.as_json(only: %i[id property_id user_id rating review created_at]), status: :created
    else
      render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end
  end
  # rubocop:enable Metrics/AbcSize,Metrics/MethodLength

  private

  def review_params
    params.require(:review).permit(:property_id, :booking_id, :rating, :review)
  end
end
# rubocop:enable Style/Documentation
