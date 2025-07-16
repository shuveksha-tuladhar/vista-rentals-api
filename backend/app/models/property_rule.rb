class PropertyRule < ApplicationRecord
  belongs_to :property

  validates :rule, presence: true
  validates :is_active, inclusion: { in: [true, false] }
end
