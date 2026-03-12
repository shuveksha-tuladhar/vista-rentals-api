user_bios = {
  "jdoe" => "Experienced host with multiple properties",
  "asmith" => "Professional host specializing in luxury rentals",
  "bjones" => "Family-friendly host with vacation homes",
  "cwilson" => "Cozy cabin specialist with mountain retreats",
  "emartinez" => "Adventure travel enthusiast offering unique stays across the Southwest",
  "lthompson" => "Boutique host curating charming urban and coastal escapes",
  "mrobinson" => "Seasoned host with a passion for historic and culturally rich properties",
}

user_bios.each do |username, bio|
  user = User.find_by(username: username, role: "admin")

  if user
    Host.create!(
      user_id: user.id,
      bio: bio,
      is_active: true,
      created_at: Time.current,
      updated_at: Time.current,
    )
    puts "Seeded Host for #{username}"
  else
    puts "Admin User not found or not an admin: #{username}"
  end
end
