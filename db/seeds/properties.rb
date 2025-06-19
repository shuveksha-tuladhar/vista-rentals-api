admin_user = User.find_by(role: 'admin')

if admin_user.nil?
  puts "⚠️ No admin user found. Please seed an admin user before creating properties."
else
  Property.create!([
    {
      user_id: admin_user.id,
      address: '123 Test Address',
      city: 'Las Vegas',
      state: 'NV',
      country: 'USA',
      zipcode: '89123',
      name: 'My Property',
      description: '',
      price: '100',
      bedrooms: 3,
      baths: 2,
      maxGuest: 5,
      created_at: '2025-05-13 06:06:18.703800',
      updated_at: '2025-05-13 06:06:18.703800'
    },
    {
      user_id: admin_user.id,
      address: '123 Address',
      city: 'Bryce Canyon City',
      state: 'UT',
      country: 'USA',
      zipcode: '55443',
      name: 'My Village',
      description: '',
      price: '300',
      bedrooms: 1,
      baths: 1,
      maxGuest: 2,
      created_at: '2025-05-13 06:37:54.879496',
      updated_at: '2025-05-13 06:37:54.879496'
    },
    {
      user_id: admin_user.id,
      address: '123 Test Address',
      city: 'Springdale',
      state: 'UT',
      country: 'USA',
      zipcode: '01234',
      name: 'My cabin house',
      description: '',
      price: '250',
      bedrooms: 2,
      baths: 2,
      maxGuest: 5,
      created_at: '2025-05-13 07:04:23.126429',
      updated_at: '2025-05-13 07:04:23.126429'
    }
  ])
end