require 'rails_helper'

RSpec.describe Amenity, type: :model do
  let(:amenity) {
    Amenity.create!(name: 'Swimming Pool')
  }

  it 'is invalid without a name' do
    amenity.name = nil
    expect(amenity).not_to be_valid
  end

  it 'is invalid with a duplicate name' do
    Amenity.create!(name: 'Swimming Pool')
    duplicate_amenity = Amenity.new(name: 'Swimming Pool')
    expect(duplicate_amenity).not_to be_valid
  end
end
