# frozen_string_literal: true

# rubocop:disable Style/Documentation
class BookingsController < ApplicationController
  before_action :set_booking, only: %i[show update]

  # POST /bookings
  def create
    booking = Booking.new(booking_params.merge(payment_status: 'pending'))

    if booking.save
      render json: booking, status: :created
    else
      render json: { errors: booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /bookings/:id
  # rubocop:disable Metrics/MethodLength
  def show
    average_rating = @booking.property.reviews.average(:rating)&.round(2) || 0.0
    existing = @booking.review

    booking_json = @booking.as_json(
      include: {
        property: {
          except: %i[created_at updated_at],
          include: {
            property_images: { only: [:url] },
            reviews: { only: %i[id review rating created_at] },
            user: {
              only: %i[first_name last_name avatar_url],
              include: { host: { only: %i[bio created_at] } }
            }
          }
        }
      }
    )

    booking_json['property']['rating'] = average_rating
    booking_json['has_review'] = existing.present?
    booking_json['existing_review'] = existing&.as_json(only: %i[id rating review created_at])

    render json: booking_json
  end
  # rubocop:enable Metrics/MethodLength

  # PATCH/PUT /bookings/:id
  # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
  def update
    status = params[:booking][:payment_token].present? ? 'complete' : 'failed'
    updated_params = booking_params.merge(payment_status: status)

    if @booking.update(updated_params)
      average_rating = @booking.property.reviews.average(:rating).round(2) || 0.00

      booking_json = @booking.as_json(
        include: {
          property: {
            except: %i[created_at updated_at],
            include: {
              property_images: { only: [:url] },
              reviews: {
                only: %i[id review rating created_at]
              }
            }
          }
        }
      )

      booking_json['property']['rating'] = average_rating

      render json: booking_json
    else
      render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end
  # rubocop:enable Metrics/AbcSize,Metrics/MethodLength

  # GET /users/:user_id/bookings
  def index_by_user
    user = User.find_by(id: params[:user_id])
    return render json: { error: 'User not found' }, status: :not_found unless user

    bookings = user.bookings.where(payment_status: 'complete').includes(property: :property_images)
    render json: { bookings: bookings.map { |b| serialize_booking(b) } }
  end

  private

  def set_booking
    @booking = Booking.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Booking not found' }, status: :not_found
  end

  def booking_params
    params.require(:booking).permit(:user_id, :property_id, :start_date, :end_date, :is_refundable, :payment_token)
  end

  def serialize_booking(booking)
    {
      id: booking.id,
      start_date: booking.start_date,
      end_date: booking.end_date,
      payment_status: booking.payment_status,
      property: serialize_property(booking.property)
    }
  end

  def serialize_property(property)
    {
      id: property.id,
      name: property.name,
      city: property.city,
      state: property.state,
      property_images: property.property_images.map { |img| { url: img.url } }
    }
  end
end
# rubocop:enable Style/Documentation
