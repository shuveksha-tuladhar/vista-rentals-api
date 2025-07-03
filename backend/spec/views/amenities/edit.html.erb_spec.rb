require 'rails_helper'

RSpec.describe "amenities/edit", type: :view do
  let(:amenity) {
    Amenity.create!(name: "Pool", isActive: true)
  }

  before(:each) do
    assign(:amenity, amenity)
  end

  it "renders the edit amenity form" do
    render

    assert_select "form[action=?][method=?]", amenity_path(amenity), "post" do
      
      assert_select "label[for=?]", "amenity_name", text: "Name"
      assert_select "input[name=?][type=?]", "amenity[name]", "text"

      assert_select "label[for=?]", "amenity_isActive", text: "Active?"
      assert_select "input[name=?][type=?]", "amenity[isActive]", "checkbox"

      assert_select "input[type=?][value=?]", "submit", "Update Amenity"
    end

    assert_select "a[href=?]", amenities_path, text: "Back to amenities"
  end

  it "displays validation errors when name is blank" do
    amenity.errors.add(:name, "can't be blank")
    render

    expect(rendered).to have_selector("div.alert.alert-danger")
    expect(rendered).to include("1 error prohibited this amenity from being saved:")
    expect(rendered).to include("Name can&#39;t be blank")
  end
end
