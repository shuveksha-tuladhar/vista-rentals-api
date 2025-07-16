class Property < ApplicationRecord
  belongs_to :user, optional: true
  has_many :bookings, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many :property_images, dependent: :destroy
  has_many :property_amenity_mappings, dependent: :destroy
  has_many :amenities, through: :property_amenity_mappings
  has_many :property_rules, dependent: :destroy
  has_many :property_safety_notes, dependent: :destroy
  has_many :property_bed_infos, dependent: :destroy

  validates :name, :address, :city, :state, :country, :zipcode, :price, presence: true
  validates :bedrooms, :baths, :max_guests, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  accepts_nested_attributes_for :property_images, allow_destroy: true
  accepts_nested_attributes_for :property_amenity_mappings, allow_destroy: true
  accepts_nested_attributes_for :property_rules, allow_destroy: true
  accepts_nested_attributes_for :property_safety_notes, allow_destroy: true
  accepts_nested_attributes_for :property_bed_infos, allow_destroy: true
end
