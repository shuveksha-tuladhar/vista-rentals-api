# frozen_string_literal: true

# Handles host-facing listing management: viewing and updating owned properties.
class HostListingsController < ApplicationController
  before_action :set_property, only: [:update]

  PER_PAGE = ENV.fetch('HOST_LISTINGS_PER_PAGE', 12).to_i

  def index
    if current_user.properties.count <= PER_PAGE
      render json: { data: all_listings.map { |p| serialize_property(p) }, error: nil }
    else
      render json: paginated_response
    end
  end

  def update
    return render json: { data: nil, error: 'Forbidden' }, status: :forbidden if forbidden?

    apply_listing_updates
    render json: { data: serialize_property(@property.reload), error: nil }
  rescue ActiveRecord::RecordInvalid => e
    render json: { data: nil, error: e.message }, status: :unprocessable_entity
  end

  private

  def forbidden?
    @property.user_id != current_user.id
  end

  def all_listings
    current_user.properties
                .includes(:property_images, :amenities, :property_bed_infos)
                .order(created_at: :desc)
  end

  def paginated_response
    page, total_pages, total_filtered = pagination_values
    properties = filtered_scope.includes(:property_images, :amenities, :property_bed_infos)
                               .offset((page - 1) * PER_PAGE)
                               .limit(PER_PAGE)

    { data: properties.map { |p| serialize_property(p) },
      meta: { current_page: page, total_pages: total_pages, total_count: total_filtered },
      error: nil }
  end

  def pagination_values
    scope = filtered_scope
    total_filtered = scope.count
    page = [params[:page].to_i, 1].max
    total_pages = [(total_filtered.to_f / PER_PAGE).ceil, 1].max
    [page, total_pages, total_filtered]
  end

  def filtered_scope
    scope = current_user.properties.order(created_at: :desc)
    return scope unless params[:search].present?

    term = "%#{params[:search].downcase}%"
    scope.where('LOWER(title) LIKE ? OR LOWER(city) LIKE ? OR LOWER(state) LIKE ?', term, term, term)
  end

  def apply_listing_updates
    ActiveRecord::Base.transaction do
      @property.assign_attributes(listing_params)
      @property.name = @property.title if @property.title.present?
      replace_photos if params[:photos].present?
      replace_amenities if params[:amenity_names].present?
      @property.save!
    end
  end

  def replace_photos
    @property.property_images.destroy_all
    params[:photos].each { |url| @property.property_images.build(url: url) }
  end

  def replace_amenities
    @property.property_amenity_mappings.destroy_all
    @property.amenity_ids = Amenity.where(name: params[:amenity_names]).pluck(:id)
  end

  def set_property
    @property = Property.find_by(id: params[:id])
    render json: { data: nil, error: 'Property not found' }, status: :not_found unless @property
  end

  def listing_params
    params.require(:property).permit(:title, :name, :description, :price)
  end

  def serialize_property(property)
    property.as_json(
      only: %i[id title name description property_type price city state country bedrooms baths
               max_guests],
      include: {
        property_images: { only: [:url] },
        amenities: { only: %i[id name] },
        property_bed_infos: { only: %i[room bed_type] }
      }
    )
  end
end
