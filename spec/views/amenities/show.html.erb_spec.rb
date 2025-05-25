require 'rails_helper'

RSpec.describe "amenities/show", type: :view do
  let(:amenity) { Amenity.create!(name: "Pool", isActive: true, created_at: Time.zone.local(2025, 1, 1)) }

  before(:each) do
    assign(:amenity, amenity)
  end

  it "renders the amenity details with correct content" do
    render

    expect(rendered).to have_selector("h2", text: "Amenity Details")

    expect(rendered).to include("Name:")
    expect(rendered).to include(amenity.name)

    expect(rendered).to include("Status:")
    expect(rendered).to include("Active")

    expect(rendered).to include("Created At:")
    expect(rendered).to include("January 01, 2025")

    expect(rendered).to have_link("Back to Amenities", href: amenities_path)
    expect(rendered).to have_link("Edit", href: edit_amenity_path(amenity))
    expect(rendered).to have_selector("a[data-method=delete][href='#{amenity_path(amenity)}']")
  end
end
