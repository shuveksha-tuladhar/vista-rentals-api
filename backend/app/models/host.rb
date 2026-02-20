class Host < ApplicationRecord
  belongs_to :user

  validates :is_active, inclusion: { in: [true, false] }
end
