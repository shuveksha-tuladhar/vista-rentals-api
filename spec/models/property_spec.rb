require 'rails_helper'

RSpec.describe Property, type: :model do
  let(:user) {
    User.create!(
      username: 'johnsmith',
      first_name: 'John',
      last_name: 'Smith',
      email: 'john.smith@test.com',
      password_hash: 'password',
      phone_number: '1234567899',
      avatar_url: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-1024.png'
    )
  }
  
  let(:property) {
    Property.create!(
      user: user,
      name: 'Cozy Cottage',
      address: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      country: 'USA',
      zipcode: '62704',
      price: 150.00,
      bedrooms: 2,
      baths: 1,
      maxGuest: 4
    )
  }

  it 'is invalid without a name' do
    property.name = nil
    expect(property).not_to be_valid
  end

  it 'is invalid without an address' do
    property.address = nil
    expect(property).not_to be_valid
  end

  it 'is invalid without a city' do
    property.city = nil
    expect(property).not_to be_valid
  end

  it 'is invalid without a state' do
    property.state = nil
    expect(property).not_to be_valid
  end

  it 'is invalid without a country' do
    property.country = nil
    expect(property).not_to be_valid
  end

  it 'is invalid without a zipcode' do
    property.zipcode = nil
    expect(property).not_to be_valid
  end

  it 'is invalid without a price' do
    property.price = nil
    expect(property).not_to be_valid
  end

  it 'is invalid if bedrooms is not an integer' do
    property.bedrooms = 'two'
    expect(property).not_to be_valid
  end

  it 'is invalid if bedrooms is less than 0' do
    property.bedrooms = -1
    expect(property).not_to be_valid
  end

  it 'is invalid if baths is not an integer' do
    property.baths = 1.5
    expect(property).not_to be_valid
  end

  it 'is invalid if baths is less than 0' do
    property.baths = -1
    expect(property).not_to be_valid
  end

  it 'is invalid if maxGuest is not an integer' do
    property.maxGuest = 'four'
    expect(property).not_to be_valid
  end

  it 'is invalid if maxGuest is less than 0' do
    property.maxGuest = -2
    expect(property).not_to be_valid
  end
end
