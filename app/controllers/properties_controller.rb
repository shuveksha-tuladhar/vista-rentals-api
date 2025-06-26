class PropertiesController < ApplicationController
  before_action :set_property, only: %i[show update destroy]

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

    render json: @properties.to_json(include: :property_images)
  end

  # GET /properties/:id
  def show
    render json: @property.to_json(include: :property_images)
  end

  # POST /properties
  def create
    @property = Property.new(property_params)

    if @property.save
      render json: @property.to_json(include: :property_images), status: :created
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
  end

  def property_params
    params.require(:property).permit(
      :name, :description, :address, :city, :state, :country, :zipcode,
      :price, :bedrooms, :baths, :maxGuest,
      amenity_ids: [],
      property_images_attributes: [:id, :url, :_destroy],
    )
  end
end
