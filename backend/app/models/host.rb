class Host < ApplicationRecord
  belongs_to :user

  validates :bio, presence: true
  validates :is_active, inclusion: { in: [true, false] }
end
