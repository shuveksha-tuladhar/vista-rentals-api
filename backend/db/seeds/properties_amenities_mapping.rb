all_amenities = Amenity.all
all_properties = Property.all

all_properties.each do |property|
  # Select a random subset of amenities for each property
  selected_amenities = all_amenities.sample(rand(5..10)) # Randomly select 5 to 10 amenities

  selected_amenities.each do |amenity|
    PropertyAmenityMapping.create!(
      property: property,
      amenity: amenity,
      created_at: Time.current,
      updated_at: Time.current,
    )
  end
  puts "Amenities assigned to property: #{property.name}"
end

puts "Completed property-amenity mappings"
