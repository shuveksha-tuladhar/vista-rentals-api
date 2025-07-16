class PropertyBedInfo < ApplicationRecord
  belongs_to :property

  validates :room, presence: true
  validates :bed_type, presence: true
  validates :is_active, inclusion: { in: [true, false] }
end
