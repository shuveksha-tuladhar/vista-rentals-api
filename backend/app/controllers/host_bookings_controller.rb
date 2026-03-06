# frozen_string_literal: true

# Handles host-facing booking data: lists all bookings for properties owned by the current user.
class HostBookingsController < ApplicationController
  PER_PAGE = ENV.fetch('HOST_BOOKINGS_PER_PAGE', 20).to_i

  # rubocop:disable Metrics/AbcSize
  def index
    scope = filtered_scope
    total_count = scope.count
    page = [params[:page].to_i, 1].max
    total_pages = [(total_count.to_f / PER_PAGE).ceil, 1].max
    bookings = scope.includes(:user, :property).offset((page - 1) * PER_PAGE).limit(PER_PAGE)
    render json: {
      bookings: bookings.map { |b| serialize_booking(b) },
      meta: { current_page: page, per_page: PER_PAGE, total_count: total_count, total_pages: total_pages }
    }
  end
  # rubocop:enable Metrics/AbcSize

  private

  def base_scope
    Booking.joins(:property)
           .where(properties: { user_id: current_user.id })
           .order(start_date: :desc)
  end

  def filtered_scope
    scope = base_scope
    scope = scope.where(property_id: params[:property_id]) if params[:property_id].present?
    scope = scope.where(payment_status: params[:payment_status]) if params[:payment_status].present?
    scope
  end

  def serialize_booking(booking)
    property = booking.property
    guest = booking.user
    total_nights = (booking.end_date.to_date - booking.start_date.to_date).to_i
    total_price = (total_nights * property.price.to_f).round(2)
    booking_details(booking, property, guest, total_nights, total_price)
  end

  # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
  def booking_details(booking, property, guest, total_nights, total_price)
    {
      id: booking.id,
      property: { id: property.id, name: property.name },
      guest: { id: guest.id, first_name: guest.first_name, last_name: guest.last_name, email: guest.email },
      start_date: booking.start_date.to_date.iso8601,
      end_date: booking.end_date.to_date.iso8601,
      total_nights: total_nights,
      total_price: format('%.2f', total_price),
      payment_status: booking.payment_status,
      is_refundable: booking.is_refundable,
      created_at: booking.created_at.iso8601
    }
  end
  # rubocop:enable Metrics/AbcSize, Metrics/MethodLength
end
