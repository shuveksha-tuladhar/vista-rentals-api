class PropertiesController < ApplicationController
  before_action :set_property, only: [:show, :update, :destroy]
  skip_before_action :authorize_request, only: [:index, :show, :location]

  # GET /properties
  def index
    if params[:query].present?
      @properties = Property.where(
        "LOWER(name) LIKE :q OR LOWER(city) LIKE :q OR LOWER(state) LIKE :q",
        q: "%#{params[:query].downcase}%",
      )
    else
      @properties = Property.all
    end

    render json: @properties.map { |property|
      property.as_json(only: [:id, :city, :property_type, :price], include: { property_images: { only: [:url] } }).merge(
        rating: property.reviews.average(:rating).round(2),
      )
    }
  end

  # GET /properties/:id
  def show
    average_rating = @property.reviews.average(:rating).round(2) || 0.00

    render json: @property.as_json(
      include: {
        property_images: { only: [:url] },
        property_bed_infos: { only: [:room, :bed_type, :is_active] },
        property_rules: { only: [:rule, :is_active] },
        property_safety_notes: { only: [:notes, :is_active] },
        amenities: { only: [:name, :isActive] },
        user: { only: [:first_name, :last_name, :avatar_url], include: { host: { only: [:bio, :created_at] } } },
        reviews: { only: [:id, :review, :rating, :created_at], include: {
          user: { only: [:first_name, :last_name] },
        } },
      },
    ).merge(rating: average_rating)
  end

  # GET /properties/location
  def location
    locations = Property.select(:city, :state).distinct.order(:state, :city)
    render json: locations
  end

  # POST /properties
  def create
    @property = Property.new(property_params)

    if @property.save
      render json: @property.to_json(include: [:property_images, :amenities]), status: :created
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
    begin
      @property = Property.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Property not found" }, status: :not_found
    end
  end

  def property_params
    params.require(:property).permit(
      :name, :description, :address, :city, :state, :country, :zipcode,
      :price, :bedrooms, :baths, :max_guests,
      amenity_ids: [],
      property_images_attributes: [:id, :url, :_destroy],
    )
  end
end
