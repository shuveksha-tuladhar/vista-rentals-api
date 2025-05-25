require 'rails_helper'

RSpec.describe "properties/show", type: :view do
  before(:each) do
    assign(:property, Property.create!(
      name: "Name",
      address: "Address",
      city: "City",
      state: "State",
      country: "Country",
      zipcode: "Zipcode",
      price: "Price",
      bedrooms: 2,
      baths: 3,
      maxGuest: 4
    ))
  end

  it "renders the data properly on the page" do
    render
    expect(rendered).to have_content("Name")
    expect(rendered).to have_content("Address")
    expect(rendered).to have_content("City")
    expect(rendered).to have_content("State")
    expect(rendered).to have_content("Country")
    expect(rendered).to have_content("Zipcode")
    expect(rendered).to have_content("per night")
    expect(rendered).to have_content("Bedrooms")
    expect(rendered).to have_content("Baths")
    expect(rendered).to have_content("Guests")
  end
end
