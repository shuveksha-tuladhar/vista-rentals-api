class PropertySafetyNote < ApplicationRecord
  belongs_to :property

  validates :notes, presence: true
  validates :is_active, inclusion: { in: [true, false] }

  # Add any additional methods or logic if needed
end
