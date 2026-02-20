class HostListingsController < ApplicationController
  before_action :set_property, only: [:update]

  def index
    properties = current_user.properties
      .includes(:property_images, :amenities, :property_bed_infos)
      .order(created_at: :desc)

    render json: {
      data: properties.map { |p| serialize_property(p) },
      error: nil
    }
  end

  def update
    if @property.user_id != current_user.id
      render json: { data: nil, error: "Forbidden" }, status: :forbidden
      return
    end

    ActiveRecord::Base.transaction do
      @property.assign_attributes(listing_params)
      @property.name = @property.title if @property.title.present?

      if params[:photos].present?
        @property.property_images.destroy_all
        params[:photos].each { |url| @property.property_images.build(url: url) }
      end

      if params[:amenity_names].present?
        @property.property_amenity_mappings.destroy_all
        amenity_ids = Amenity.where(name: params[:amenity_names]).pluck(:id)
        @property.amenity_ids = amenity_ids
      end

      @property.save!
    end

    render json: { data: serialize_property(@property.reload), error: nil }
  rescue ActiveRecord::RecordInvalid => e
    render json: { data: nil, error: e.message }, status: :unprocessable_entity
  end

  private

  def set_property
    @property = Property.find_by(id: params[:id])
    render json: { data: nil, error: "Property not found" }, status: :not_found unless @property
  end

  def listing_params
    params.require(:property).permit(:title, :name, :description, :price)
  end

  def serialize_property(property)
    property.as_json(
      only: [:id, :title, :name, :description, :property_type, :price, :city, :state, :country, :bedrooms, :baths, :max_guests],
      include: {
        property_images: { only: [:url] },
        amenities: { only: [:id, :name] },
        property_bed_infos: { only: [:room, :bed_type] }
      }
    )
  end
end
