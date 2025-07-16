user_bios = {
  "jdoe" => "Experienced host with multiple properties",
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
