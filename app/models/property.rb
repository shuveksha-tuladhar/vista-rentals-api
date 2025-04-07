class Property < ApplicationRecord
  belongs_to :user
  has_many :bookings
  has_many :reviews
  has_many :property_images
  
  validates :name, :address, :city, :state, :country, :zipcode, :price, presence: true
  validates :bedrooms, :baths, :maxGuest, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
