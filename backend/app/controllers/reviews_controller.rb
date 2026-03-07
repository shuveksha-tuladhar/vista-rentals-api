# frozen_string_literal: true

# rubocop:disable Style/Documentation
class ReviewsController < ApplicationController
  # rubocop:disable Metrics/MethodLength
  def create
    review = Review.new(review_params.merge(user_id: current_user.id))

    if review.save
      render json: review.as_json(only: %i[id property_id user_id rating review created_at]), status: :created
    else
      render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end
  end
  # rubocop:enable Metrics/MethodLength

  private

  def review_params
    params.require(:review).permit(:property_id, :rating, :review)
  end
end
# rubocop:enable Style/Documentation
