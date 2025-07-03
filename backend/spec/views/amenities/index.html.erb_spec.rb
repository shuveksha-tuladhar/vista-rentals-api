require 'rails_helper'

RSpec.describe "amenities/index", type: :view do
  let!(:amenity1) { Amenity.create!(name: "Pool", isActive: true, created_at: 2.days.ago) }
  let!(:amenity2) { Amenity.create!(name: "Gym", isActive: false, created_at: 1.day.ago) }

  before(:each) do
    assign(:amenities, [amenity1, amenity2])
  end

  it "renders a list of amenities with correct details and controls" do
    render

    expect(rendered).to have_content("Amenities")
    expect(rendered).to have_selector("h1.mb-4", text: "Amenities")

    assert_select "form[action=?][method=?]", amenities_path, "get" do
      assert_select "label[for=?]", "query", text: "Search"
      assert_select "input[name=?][type=?]", "query", "text"
      assert_select "input[type=?][value=?]", "submit", "Filter"
    end

    assert_select "table thead tr" do
      assert_select "th", text: "Name"
      assert_select "th", text: "Status"
      assert_select "th", text: "Created At"
      assert_select "th", text: "Actions"
    end

    assert_select "table tbody tr", count: 2

    assert_select "table tbody tr:nth-child(1)" do
      assert_select "td", text: amenity1.name
      assert_select "td span.badge.bg-success", text: "Active"
      assert_select "td", text: amenity1.created_at.strftime("%Y-%m-%d")
      assert_select "td a.btn-outline-secondary", text: "Edit"
      assert_select "td a.btn-outline-danger", text: "Delete"
    end

    assert_select "table tbody tr:nth-child(2)" do
      assert_select "td", text: amenity2.name
      assert_select "td span.badge.bg-secondary", text: "Inactive"
      assert_select "td", text: amenity2.created_at.strftime("%Y-%m-%d")
      assert_select "td a.btn-outline-secondary", text: "Edit"
      assert_select "td a.btn-outline-danger", text: "Delete"
    end

    assert_select "a.btn.btn-primary.mt-3", text: "New Amenity"
  end
end
