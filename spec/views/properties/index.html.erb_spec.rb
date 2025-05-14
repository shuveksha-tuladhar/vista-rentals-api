require 'rails_helper'

RSpec.describe "properties/index.html.erb", type: :view do
  before do
    @property = Property.create(
      name: "Beautiful Beach House",
      address: "123 Ocean Drive",
      city: "Miami",
      state: "FL",
      country: "USA",
      zipcode: "33101",
      price: 200,
      bedrooms: 3,
      baths: 2,
      maxGuest: 6,
      description: "A beautiful beach house with stunning views."
    )

    assign(:properties, [@property]) 
    @notice = "Test notice"
  end

  it "displays the correct title" do
    render
    expect(rendered).to have_content("Properties")
  end

  it "displays the property name" do
    render
    expect(rendered).to have_content(@property.name)
  end

  it "displays the property city, state, and country" do
    render
    expect(rendered).to have_content(@property.city)
    expect(rendered).to have_content(@property.state)
    expect(rendered).to have_content(@property.country)
  end

  it "displays the correct price, bedrooms, and baths" do
    render
    expect(rendered).to have_content("$#{@property.price}")
    expect(rendered).to have_content("#{@property.bedrooms} bd")
    expect(rendered).to have_content("#{@property.baths} ba")
  end

  it "renders a link to view the property" do
    render
    expect(rendered).to have_link("View", href: property_path(@property))
    expect(rendered).to have_css('i.bi-eye')
  end

  it "renders a link to edit the property" do
    render
    expect(rendered).to have_link("Edit", href: edit_property_path(@property))
    expect(rendered).to have_css('i.bi-pencil')
  end

  it "renders a link to delete the property" do
    render
    expect(rendered).to have_link("Delete", href: property_path(@property))
    expect(rendered).to have_css('i.bi-trash')
  end

  it "has a link to create a new property" do
    render
    expect(rendered).to have_link("Add New Property", href: new_property_path)
    expect(rendered).to have_css('i.bi-plus-circle')
  end
end
