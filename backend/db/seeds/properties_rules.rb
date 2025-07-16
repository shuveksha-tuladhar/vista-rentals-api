property_rule_data = {
  "My Property" => ["No smoking", "No pets"],
  "My Village" => ["Quiet hours after 10 PM", "No parties"],
  "My cabin house" => ["Leave shoes at the entrance", "Recycle waste properly"],
  "Beachside Retreat" => ["No loud music", "Water conservation required"],
}

property_rule_data.each do |property_name, rules|
  property = Property.find_by(name: property_name)

  if property
    rules.each do |rule|
      PropertyRule.create!(
        property_id: property.id,
        rule: rule,
        is_active: true,
        created_at: Time.current,
        updated_at: Time.current,
      )
    end
    puts "Seeded Rules for #{property_name}"
  else
    puts "Property not found: #{property_name}"
  end
end
