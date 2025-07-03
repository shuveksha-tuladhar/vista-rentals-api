require 'rails_helper'

RSpec.describe "properties/new", type: :view do
  before(:each) do
    assign(:property, Property.new(
      name: "MyString",
      address: "MyString",
      city: "MyString",
      state: "MyString",
      country: "MyString",
      zipcode: "MyString",
      price: "MyString",
      bedrooms: 1,
      baths: 1,
      maxGuest: 1
    ))
  end

  it "renders with New Property" do
    render
    expect(rendered).to have_content("New Property");
  end

  it "renders with Create Property button" do
    render
    expect(rendered).to include("Create Property");
  end

  it "renders should not have  Update Property button" do
    render
    expect(rendered).not_to include("Update Property");
  end

  it "renders new property form" do
    render

    assert_select "form[action=?][method=?]", properties_path, "post" do

      assert_select "input[name=?]", "property[name]"

      assert_select "input[name=?]", "property[address]"

      assert_select "input[name=?]", "property[city]"

      assert_select "input[name=?]", "property[state]"

      assert_select "input[name=?]", "property[country]"

      assert_select "input[name=?]", "property[zipcode]"

      assert_select "input[name=?]", "property[price]"

      assert_select "input[name=?]", "property[bedrooms]"

      assert_select "input[name=?]", "property[baths]"

      assert_select "input[name=?]", "property[maxGuest]"
    end
  end
end
