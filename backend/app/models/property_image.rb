class PropertyImage < ApplicationRecord
  belongs_to :property

  validates :url, presence: true, format: URI::regexp(%w[http https])
end
