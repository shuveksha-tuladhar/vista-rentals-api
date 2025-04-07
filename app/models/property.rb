class Property < ApplicationRecord
  belongs_to :user
  has_many :bookings
  has_many :reviews
  has_many :property_images
  has_many :property_amenity_mappings
  has_many :amenities, through: :property_amenity_mappings

  validates :name, :address, :city, :state, :country, :zipcode, :price, presence: true
  validates :bedrooms, :baths, :maxGuest, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
