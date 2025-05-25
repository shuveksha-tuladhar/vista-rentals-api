require 'rails_helper'

RSpec.describe "amenities/new", type: :view do
  let(:amenity) { Amenity.new }

  before(:each) do
    assign(:amenity, amenity)
  end

  it "renders new amenity form with expected elements" do
    render
    expect(rendered).to have_selector("h1", text: "New Amenity")

    assert_select "form[action=?][method=?]", amenities_path, "post" do

      assert_select "label", text: "Name"
      assert_select "input[name=?]", "amenity[name]"

      assert_select "label", text: "Active?"
      assert_select "input[type=?][name=?]", "checkbox", "amenity[isActive]"

      assert_select "input[type=?][value=?]", "submit", "Create Amenity"
    end
  end

  it "displays validation errors when name is blank" do
    amenity.errors.add(:name, "can't be blank")
    render

    expect(rendered).to have_selector("div.alert.alert-danger")
    expect(rendered).to include("1 error prohibited this amenity from being saved:")
    expect(rendered).to include("Name can&#39;t be blank")
  end
end
