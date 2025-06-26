class AmenitiesController < ApplicationController
  before_action :set_amenity, only: %i[show update destroy]

  # GET /amenities
  def index
    if params[:query].present?
      @amenities = Amenity.where("LOWER(name) LIKE ?", "%#{params[:query].downcase}%")
    else
      @amenities = Amenity.all
    end

    render json: @amenities
  end

  # GET /amenities/:id
  def show
    render json: @amenity
  end

  # POST /amenities
  def create
    @amenity = Amenity.new(amenity_params)

    if @amenity.save
      render json: @amenity, status: :created
    else
      render json: { errors: @amenity.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /amenities/:id
  def update
    if @amenity.update(amenity_params)
      render json: @amenity, status: :ok
    else
      render json: { errors: @amenity.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /amenities/:id
  def destroy
    @amenity.destroy
    head :no_content
  end

  private

  def set_amenity
    @amenity = Amenity.find(params[:id])
  end

  def amenity_params
    params.require(:amenity).permit(:name, :isActive)
  end
end
