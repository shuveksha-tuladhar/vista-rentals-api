require "rails_helper"

RSpec.describe PropertyImage, type: :model do
  let(:user) {
    User.create!(
      username: "johnsmith",
      first_name: "John",
      last_name: "Smith",
      email: "john.smith@test.com",
      password_hash: "password",
      phone_number: "1234567899",
      avatar_url: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-1024.png",
    )
  }

  let(:property) {
    Property.create!(
      user: user,
      name: "Modern Loft",
      address: "456 Elm St",
      city: "Metropolis",
      state: "NY",
      country: "USA",
      zipcode: "10001",
      price: 200,
      bedrooms: 1,
      baths: 1,
      max_guests: 2,
    )
  }

  let(:property_image) {
    PropertyImage.new(
      property: property,
      url: "https://example.com/image.jpg",
    )
  }

  it "is valid with valid attributes" do
    expect(property_image).to be_valid
  end

  it "is invalid without a url" do
    property_image.url = nil
    expect(property_image).not_to be_valid
  end

  it "is invalid with an improperly formatted url" do
    property_image.url = "invalid-url"
    expect(property_image).not_to be_valid
  end

  it "is valid with a properly formatted url" do
    property_image.url = "https://example.com/image.jpg"
    expect(property_image).to be_valid
  end

  it "is invalid with a non-http/https url" do
    property_image.url = "ftp://example.com/image.jpg"
    expect(property_image).not_to be_valid
  end

  it "is invalid without an associated property" do
    property_image.property = nil
    expect(property_image).not_to be_valid
  end
end
