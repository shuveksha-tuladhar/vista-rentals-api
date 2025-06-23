class PropertiesController < ApplicationController
  before_action :set_property, only: %i[ show edit update destroy ]
  before_action :require_login

  # GET /properties or /properties.json
  def index
    if params[:query].present?
      @properties = Property.where(
        "LOWER(name) LIKE :q OR LOWER(city) LIKE :q OR LOWER(state) LIKE :q",
        q: "%#{params[:query]}%"
      )
    else
      @properties = Property.all
    end
  end

  # GET /properties/1 or /properties/1.json
  def show
  end

  # GET /properties/new
  def new
    @property = Property.new
    @property.property_images.build
  end

  # GET /properties/1/edit
  def edit
      @property = Property.find(params[:id])
      @property.property_images.build if @property.property_images.empty?
  end

  # POST /properties or /properties.json
  def create
    @property = Property.new(property_params)

    respond_to do |format|
      if @property.save
        format.html { redirect_to @property, notice: "Property was successfully created." }
        format.json { render :show, status: :created, location: @property }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @property.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /properties/1 or /properties/1.json
  def update
    respond_to do |format|
      if @property.update(property_params)
        format.html { redirect_to @property, notice: "Property was successfully updated." }
        format.json { render :show, status: :ok, location: @property }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @property.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /properties/1 or /properties/1.json
  def destroy
    @property.destroy!

    respond_to do |format|
      format.html { redirect_to properties_path, status: :see_other, notice: "Property was successfully deleted." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_property
    @property = Property.find(params.expect(:id))
  end

  def property_params
    params.require(:property).permit(
      :name, :address, :city, :state, :country, :zipcode,
      :price, :bedrooms, :baths, :maxGuest,
      property_images_attributes: [:id, :url, :_destroy]
    )
  end
end
