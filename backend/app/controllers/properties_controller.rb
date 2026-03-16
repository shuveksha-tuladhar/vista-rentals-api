# frozen_string_literal: true

class PropertiesController < ApplicationController
  before_action :set_property, only: %i[show update destroy ai_summary]
  skip_before_action :authorize_request, only: %i[index show location booked_dates ai_summary]

  # GET /properties
  def index
    @properties = Property.all

    if params[:query].present?
      @properties = @properties.where(
        'LOWER(name) LIKE :q OR LOWER(city) LIKE :q OR LOWER(state) LIKE :q',
        q: "%#{params[:query].downcase}%"
      )
    end

    @properties = @properties.where('LOWER(state) = ?', params[:state].downcase) if params[:state].present?

    @properties = @properties.where('LOWER(city) = ?', params[:city].downcase) if params[:city].present?

    @properties = @properties.where('max_guests >= ?', params[:guests].to_i) if params[:guests].present?

    if params[:checkIn].present? && params[:checkOut].present?
      check_in = Date.parse(params[:checkIn])
      check_out = Date.parse(params[:checkOut])

      booked_property_ids = Booking.where(payment_status: 'complete')
                                   .where('start_date < ? AND end_date > ?', check_out, check_in)
                                   .pluck(:property_id).uniq

      @properties = @properties.where.not(id: booked_property_ids)
    end

    render json: @properties.map { |property|
      average_rating = property.reviews.average(:rating)
      property.as_json(
        only: %i[id name city state property_type price coordinates_latitude
                 coordinates_longitude], include: { property_images: { only: [:url] } }
      ).merge(
        rating: average_rating ? average_rating.round(2) : 0.0
      )
    }
  end

  # GET /properties/:id
  def show
    enqueue_first_ai_summary_attempt

    average_rating = @property.reviews.average(:rating)&.round(2) || 0.00

    render json: @property.as_json(
      include: {
        property_images: { only: [:url] },
        property_bed_infos: { only: %i[room bed_type is_active] },
        property_rules: { only: %i[rule is_active] },
        property_safety_notes: { only: %i[notes is_active] },
        amenities: { only: %i[name isActive] },
        user: { only: %i[first_name last_name avatar_url], include: { host: { only: %i[bio created_at] } } },
        reviews: { only: %i[id review rating created_at], include: {
          user: { only: %i[first_name last_name] }
        } }
      }
    ).merge(
      rating: average_rating,
      ai_summary: @property.ai_summary,
      ai_summary_generated_at: @property.ai_summary_generated_at
    )
  end

  # GET /properties/:id/ai-summary
  def ai_summary
    render json: {
      ai_summary: @property.ai_summary,
      pending: @property.ai_summary.nil? && @property.ai_summary_attempted_at.present? && @property.ai_summary_error.nil?,
      failed: @property.ai_summary_error.present?
    }
  end

  # GET /properties/location
  def location
    locations = Property.select(:city, :state).distinct.order(:state, :city)
    render json: locations
  end

  # GET /properties/:id/booked-dates
  def booked_dates
    property = Property.find_by(id: params[:id])
    return render json: { error: 'Property not found' }, status: :not_found unless property

    bookings = Booking.where(property_id: property.id, payment_status: 'complete')
                      .where('end_date >= ?', Date.today)

    render json: {
      booked_dates: bookings.map do |b|
        { start_date: b.start_date.to_date.iso8601, end_date: b.end_date.to_date.iso8601 }
      end
    }
  end

  # POST /properties
  def create
    Host.find_or_create_by!(user_id: current_user.id) do |host|
      host.is_active = true
    end

    @property = current_user.properties.new(property_params)

    if params[:amenity_names].present?
      amenity_ids = params[:amenity_names].map { |name| Amenity.find_or_create_by!(name: name).id }
      @property.amenity_ids = amenity_ids
    end

    if @property.save
      render json: @property.to_json(include: %i[property_images amenities]), status: :created
    else
      render json: { errors: @property.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /properties/:id
  def update
    if @property.update(property_params)
      render json: @property.to_json(include: :property_images), status: :ok
    else
      render json: { errors: @property.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /properties/:id
  def destroy
    @property.destroy
    head :no_content
  end

  private

  def set_property
    @property = Property.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Property not found' }, status: :not_found
  end

  def property_params
    params.require(:property).permit(
      :name, :title, :description, :address, :city, :state, :country, :zipcode,
      :price, :bedrooms, :baths, :max_guests, :property_type,
      amenity_ids: [],
      property_images_attributes: %i[id url _destroy],
      property_bed_infos_attributes: %i[room bed_type is_active]
    )
  end

  def enqueue_first_ai_summary_attempt
    return unless @property.first_ai_summary_attempt?
    return unless @property.has_minimum_reviews_for_ai_summary?

    GeneratePropertyAiSummaryJob.perform_later(@property.id)
  end
end
