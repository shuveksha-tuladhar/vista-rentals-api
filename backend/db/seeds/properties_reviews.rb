properties = Property.all
users = User.all

if users.any?
  properties.each do |property|
    rand(2..10).times do
      random_user = users.sample
      rating = rand(3..5)
      review = "Review by #{random_user.first_name} for #{property.name}"

      Review.create!(
        property_id: property.id,
        user_id: random_user.id,
        rating: rating,
        review: review,
        created_at: Time.current,
        updated_at: Time.current,
      )
    end
    puts "Seeded Reviews for #{property.name}"
  end
else
  puts "No users available to create reviews."
end
