class BookingsController < ApplicationController
  before_action :set_booking, only: [:show, :update]

  # POST /bookings
  def create
    booking = Booking.new(booking_params.merge(payment_status: "pending"))

    if booking.save
      render json: booking, status: :created
    else
      render json: { errors: booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /bookings/:id
  def show
    render json: @booking
  end

  # PATCH/PUT /bookings/:id
  def update
    status = params[:booking][:payment_token].present? ? "complete" : "failed"
    updated_params = booking_params.merge(payment_status: status)

    if @booking.update(updated_params)
      average_rating = @booking.property.reviews.average(:rating).round(2) || 0.00

      booking_json = @booking.as_json(
        include: {
          property: {
            except: [:created_at, :updated_at],
            include: {
              property_images: { only: [:url] },
              reviews: {
                only: [:id, :review, :rating, :created_at],
              },
            },
          },
        },
      )

      booking_json["property"]["rating"] = average_rating

      render json: booking_json
    else
      render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /users/:user_id/bookings
  def index_by_user
    user = User.find_by(id: params[:user_id])

    if user
      bookings = user.bookings.includes(:property)
      render json: bookings, include: :property
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  private

  def set_booking
    @booking = Booking.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Booking not found" }, status: :not_found
  end

  def booking_params
    params.require(:booking).permit(:user_id, :property_id, :start_date, :end_date, :is_refundable, :payment_token)
  end
end
