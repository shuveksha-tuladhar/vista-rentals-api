class Amenity < ApplicationRecord
    has_many :property_amenity_mappings,
    has_many :properties, through: :property_amenity_mappings
  
    validates :name, presence: true, uniqueness: true
end
