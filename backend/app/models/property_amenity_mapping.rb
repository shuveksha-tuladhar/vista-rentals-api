class PropertyAmenityMapping < ApplicationRecord
  belongs_to :property
  belongs_to :amenity
end
