property_bed_info_data = {
  "My Property" => [["Master Bedroom", "King"], ["Guest Room", "Queen"]],
  "My Village" => [["Cabin Room", "Double"]],
  "My cabin house" => [["Loft", "Twin"]],
  "Beachside Retreat" => [["Beach Room", "Queen"], ["Ocean View Room", "King"]],
}

property_bed_info_data.each do |property_name, beds|
  property = Property.find_by(name: property_name)

  if property
    beds.each do |room, bed_type|
      PropertyBedInfo.create!(
        property_id: property.id,
        room: room,
        bed_type: bed_type,
        is_active: true,
        created_at: Time.current,
        updated_at: Time.current,
      )
    end
    puts "Seeded Bed Info for #{property_name}"
  else
    puts "Property not found: #{property_name}"
  end
end
