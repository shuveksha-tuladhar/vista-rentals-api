class BookingsController < ApplicationController
  before_action :set_booking, only: [:show, :update]

  # POST /bookings
  def create
    booking = Booking.new(booking_params)

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
    if @booking.update(booking_params)
      render json: @booking
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
    params.require(:booking).permit(:user_id, :property_id, :start_date, :end_date)
  end
end
