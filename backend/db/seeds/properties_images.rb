admin_user = User.find_by(role: 'admin')

if admin_user.nil?
  puts "No admin user found. Please seed an admin user before creating properties."
else
  property_image_data = {
    'My Property' => 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI3ODM2MTk5OTc1ODI1OTg5MQ%3D%3D/original/9216ec7a-f4ae-423d-8e87-1d84b69f1bec.jpeg?im_w=1200',
    'My Village' => 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMyMjQ2NTYwODg5NjgxMzIzMA%3D%3D/original/5a900869-9b4c-4bc5-85f8-d2f0c934537c.jpeg?im_w=1200',
    'My cabin house' => 'https://a0.muscache.com/im/pictures/miso/Hosting-1311339745870663573/original/de77e090-a61d-4ab9-84fc-88e1b4e9e5d1.jpeg?im_w=1200',
    'Beachside Retreat' => 'https://a0.muscache.com/im/pictures/miso/Hosting-1179791415409569964/original/067e0ae9-d5ff-4d23-8455-4c6418bd3934.jpeg?im_w=1200',
    'Mountain Escape' => 'https://a0.muscache.com/im/pictures/miso/Hosting-1185412033137574849/original/77f82c27-189b-4da9-9bce-ed25b49aa697.jpeg?im_w=1200',
    'Rustic Cabin' => 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI0NzEzNjkwNDU0NzkyMTI2Mg==/original/51a8b735-7a38-4791-944e-6e988ad6e268.jpeg?im_w=1200',
    'Red Rock Haven' => 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-634779518286767410/original/12ee36e6-436a-4cf7-b0eb-bd067c124fd5.jpeg?im_w=1200',
    'Lakeside Lodge' => 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE4NDIwMDczNDE5MjUwNDM0Mw%3D%3D/original/c9eec5ee-771f-4a22-b679-344f70de8de3.jpeg?im_w=1200',
    'Historic French Quarter Home' => 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1431800942585762066/original/03257805-196c-435e-8f3b-d7d85f434ab4.png?im_w=1200'
  }

  property_image_data.each do |property_name, url|
    property = Property.find_by(name: property_name)

    if property
      PropertyImage.create!(
        property_id: property.id,
        url: url,
        created_at: Time.current,
        updated_at: Time.current
      )
      puts "Seeded Image for #{property_name}"
    else
      puts "Property not found: #{property_name}"
    end
  end
end
