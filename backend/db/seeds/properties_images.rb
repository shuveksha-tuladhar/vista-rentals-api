admin_user = User.find_by(role: "admin")

if admin_user.nil?
  puts "No admin user found. Please seed an admin user before creating properties."
else
  property_image_data = {
    "My Property" => ["https://a0.muscache.com/im/pictures/8e087b4b-9512-4090-bcb3-934f6751f8f6.jpg?im_w=1200",
                      "https://a0.muscache.com/im/pictures/2be32e3f-7647-4a9e-811d-2e74cf857af3.jpg?im_w=1440",
                      "https://a0.muscache.com/im/pictures/0faa8bf8-0efa-4d2c-9b09-37fac8b18e36.jpg?im_w=1440",
                      "https://a0.muscache.com/im/pictures/b7bd5ed8-3fb5-41da-9ca9-08bfc802c401.jpg?im_w=1440",
                      "https://a0.muscache.com/im/pictures/7825aedc-624d-4ef4-8354-acaa9cccf8d7.jpg?im_w=1440"],
    "My Village" => ["https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMyMjQ2NTYwODg5NjgxMzIzMA%3D%3D/original/5a900869-9b4c-4bc5-85f8-d2f0c934537c.jpeg?im_w=1200",
                     "https://a0.muscache.com/im/pictures/miso/Hosting-1314248188157667358/original/893763f9-3164-4ca5-b839-4a9a6ae62f86.jpeg?im_w=1440",
                     "https://a0.muscache.com/im/pictures/miso/Hosting-1314248188157667358/original/ffdba362-546f-4c3c-aec6-1a8d0a869166.jpeg?im_w=1440",
                     "https://a0.muscache.com/im/pictures/miso/Hosting-1314248188157667358/original/5315e204-0046-4400-bf2c-bc5eed4d9220.jpeg?im_w=1440",
                     "https://a0.muscache.com/im/pictures/miso/Hosting-1314248188157667358/original/66d932bf-71aa-4947-b9c2-cd2961f365d4.jpeg?im_w=1440"],
    "My cabin house" => ["https://a0.muscache.com/im/pictures/miso/Hosting-1311339745870663573/original/de77e090-a61d-4ab9-84fc-88e1b4e9e5d1.jpeg?im_w=1200",
                         "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMxMTcxNjA5MDQ0MzcyNDQ2MA==/original/ef89e78a-8c66-4b44-b1a7-ef391a72ff14.jpeg?im_w=1200",
                         "https://a0.muscache.com/im/pictures/miso/Hosting-1311716090443724460/original/1df97620-5311-4968-afc3-3e3f04f5583d.jpeg?im_w=1440",
                         "https://a0.muscache.com/im/pictures/miso/Hosting-1311716090443724460/original/9c4be99c-619a-4953-9511-4cf0f1ed3983.jpeg?im_w=1440",
                         "https://a0.muscache.com/im/pictures/miso/Hosting-1311716090443724460/original/6249ef28-a6ac-4f9e-a35c-0a890e71bbc2.jpeg?im_w=1440"],
    "Beachside Retreat" => ["https://a0.muscache.com/im/pictures/miso/Hosting-1179791415409569964/original/067e0ae9-d5ff-4d23-8455-4c6418bd3934.jpeg?im_w=1200",
                            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTc0OTYwOTc4MzA1NTY2MTA3/original/052a10ca-ebf9-4ec3-ac7e-f2c16b68fc2e.jpeg?im_w=1200",
                            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTc0OTYwOTc4MzA1NTY2MTA3/original/e56a243e-6bce-4f32-a718-257141048461.jpeg?im_w=1440",
                            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTc0OTYwOTc4MzA1NTY2MTA3/original/19226efd-cf2c-4d7a-8af1-0ef53f0865fa.jpeg?im_w=1440",
                            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTc0OTYwOTc4MzA1NTY2MTA3/original/15ba8977-7527-41be-b3fc-2077ec846551.jpeg?im_w=1440"],
    "Mountain Escape" => ["https://a0.muscache.com/im/pictures/miso/Hosting-1185412033137574849/original/77f82c27-189b-4da9-9bce-ed25b49aa697.jpeg?im_w=1200"],
    "Rustic Cabin" => ["https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI0NzEzNjkwNDU0NzkyMTI2Mg==/original/51a8b735-7a38-4791-944e-6e988ad6e268.jpeg?im_w=1200"],
    "Red Rock Haven" => ["https://a0.muscache.com/im/pictures/prohost-api/Hosting-634779518286767410/original/12ee36e6-436a-4cf7-b0eb-bd067c124fd5.jpeg?im_w=1200"],
    "Lakeside Lodge" => ["https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE4NDIwMDczNDE5MjUwNDM0Mw%3D%3D/original/c9eec5ee-771f-4a22-b679-344f70de8de3.jpeg?im_w=1200"],
    "Historic French Quarter Home" => ["https://a0.muscache.com/im/pictures/prohost-api/Hosting-1431800942585762066/original/03257805-196c-435e-8f3b-d7d85f434ab4.png?im_w=1200"],
  }

  property_image_data.each do |property_name, urls|
    property = Property.find_by(name: property_name)

    if property
      urls.each do |url|
        PropertyImage.create!(
          property_id: property.id,
          url: url,
          created_at: Time.current,
          updated_at: Time.current,
        )
      end
      puts "Seeded Image for #{property_name}"
    else
      puts "Property not found: #{property_name}"
    end
  end
end
