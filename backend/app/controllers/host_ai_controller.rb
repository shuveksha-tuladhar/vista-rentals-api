# frozen_string_literal: true

# Provides AI-powered suggestions for host listing management.
class HostAiController < ApplicationController
  before_action :authorize_request

  def suggest_price
    property = nil

    if request_params[:property_id].present?
      property = Property.find_by(id: request_params[:property_id])
      return render json: { data: nil, error: 'Property not found' }, status: :not_found if property.nil?

      return render json: { data: nil, error: 'Forbidden' }, status: :forbidden if property.user_id != current_user.id
    end

    result = Properties::SuggestSmartPrice.new(property, permitted_params).call
    return render json: { data: nil, error: result[:error] }, status: :unprocessable_entity unless result[:success]

    render json: { data: result[:suggestion], error: nil }
  rescue StandardError => e
    Rails.logger.error("[HostAiController#suggest_price] #{e.message}")
    render json: { data: nil, error: 'AI suggestion unavailable' }, status: :bad_gateway
  end

  private

  def request_params
    permitted = params.permit(
      :property_id,
      :property_type,
      :city,
      :state,
      :bedrooms,
      :max_guests,
      amenities: [],
      host_ai: [
        :property_id,
        :property_type,
        :city,
        :state,
        :bedrooms,
        :max_guests,
        { amenities: [] }
      ]
    )

    permitted[:host_ai].presence || permitted
  end

  def permitted_params
    request_params.to_h
          .slice(:property_type, :city, :state, :bedrooms, :max_guests, :amenities)
  end
end
