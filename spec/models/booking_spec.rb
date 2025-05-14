require 'rails_helper'

RSpec.describe Booking, type: :model do
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
      name: 'Modern Loft',
      address: '456 Elm St',
      city: 'Metropolis',
      state: 'NY',
      country: 'USA',
      zipcode: '10001',
      price: 200,
      bedrooms: 1,
      baths: 1,
      maxGuest: 2
    )
  }

  let(:booking) {
    Booking.create!(
      user: user,
      property: property,
      start_date: Date.today,
      end_date: Date.today + 3.days
    )
  }

  it 'is invalid without a start_date' do
    booking.start_date = nil
    expect(booking).not_to be_valid
  end

  it 'is invalid without an end_date' do
    booking.end_date = nil
    expect(booking).not_to be_valid
  end

  it 'is invalid if end_date is before start_date' do
    booking.start_date = Date.today
    booking.end_date = Date.yesterday
    expect(booking).not_to be_valid
    expect(booking.errors[:end_date]).to include("must be after the start date")
  end

  it 'is invalid if end_date is the same as start_date' do
    booking.start_date = Date.today
    booking.end_date = Date.today
    expect(booking).not_to be_valid
    expect(booking.errors[:end_date]).to include("must be after the start date")
  end

  it 'is valid when end_date is after start_date' do
    booking.start_date = Date.today
    booking.end_date = Date.today + 1.day
    expect(booking).to be_valid
  end
end