property_safety_notes_data = {
  "My Property" => "Fire extinguisher in the kitchen",
  "My Village" => "Emergency exit near the living room",
  "My cabin house" => "First aid kit in the master bedroom",
  "Beachside Retreat" => "Life jackets available by the beach area",
}

property_safety_notes_data.each do |property_name, notes|
  property = Property.find_by(name: property_name)

  if property
    PropertySafetyNote.create!(
      property_id: property.id,
      notes: notes,
      is_active: true,
      created_at: Time.current,
      updated_at: Time.current,
    )
    puts "Seeded Safety Notes for #{property_name}"
  else
    puts "Property not found: #{property_name}"
  end
end
