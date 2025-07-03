require 'rails_helper'

RSpec.describe Review, type: :model do
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

  let(:review) {
    Review.new(
      user: user,
      property: property,
      review: 'This is a great property!',
      rating: 5
    )
  }

  it 'is valid with valid attributes' do
    expect(review).to be_valid
  end

  it 'is invalid without a review' do
    review.review = nil
    expect(review).not_to be_valid
  end

  it 'is invalid without a rating' do
    review.rating = nil
    expect(review).not_to be_valid
  end

  it 'is invalid with a rating less than 1' do
    review.rating = 0
    expect(review).not_to be_valid
  end

  it 'is invalid with a rating greater than 5' do
    review.rating = 6
    expect(review).not_to be_valid
  end

  it 'is invalid with a non-integer rating' do
    review.rating = 4.5
    expect(review).not_to be_valid
  end

  it 'is invalid without an associated user' do
    review.user = nil
    expect(review).not_to be_valid
  end

  it 'is invalid without an associated property' do
    review.property = nil
    expect(review).not_to be_valid
  end
end
