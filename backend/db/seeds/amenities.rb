amenities = [
  # Essentials
  "Wi-Fi",
  "TV",
  "Air conditioning",
  "Heating",
  "Washer",
  "Dryer",
  "Hot water",
  "Iron",
  "Hair dryer",
  "Hangers",
  "Bed linens",
  "Extra pillows and blankets",
  "Room-darkening shades",
  "Clothing storage",

  # Kitchen
  "Refrigerator",
  "Microwave",
  "Cooking basics (pots, pans, oil, salt & pepper)",
  "Dishes and silverware",
  "Stove",
  "Oven",
  "Dishwasher",
  "Coffee maker",
  "Toaster",
  "Dining table",

  # Bathroom
  "Shampoo",
  "Conditioner",
  "Body soap",
  "Toilet paper",
  "Towels",
  "Bathtub",
  "Private bathroom",

  # Entertainment
  "Smart TV",
  "Streaming services",
  "Board games",
  "Books and reading material",

  # Outdoor
  "Patio or balcony",
  "Backyard",
  "Outdoor dining area",
  "BBQ grill",
  "Fire pit",

  # Parking & facilities
  "Free parking on premises",
  "Paid parking on premises",
  "EV charger",
  "Pool",
  "Hot tub",
  "Gym",
  "Elevator",

  # Safety
  "Smoke alarm",
  "Carbon monoxide alarm",
  "First aid kit",
  "Fire extinguisher",
  "Security cameras on property",

  # Internet & workspace
  "Dedicated workspace",
  "High-speed Wi-Fi",

  # Accessibility (if applicable)
  "Wheelchair accessible",
  "Step-free access",
  "Accessible parking spot",

  # Others
  "Pets allowed",
  "Luggage dropoff allowed",
  "Long term stays allowed",
  "Self check-in",
  "Keypad",
  "Lockbox",
]

amenities.each do |name|
  Amenity.find_or_create_by!(name: name) do |amenity|
    amenity.isActive = true
  end
end

puts "Seeded #{Amenity.count} amenities ✅"
