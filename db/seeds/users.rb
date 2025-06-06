require 'bcrypt'

User.create!([
  {
    username: 'jdoe',
    first_name: 'John',
    middle_name: 'A',
    last_name: 'Doe',
    email: 'jdoe@example.com',
    password_hash: BCrypt::Password.create('password'),
    phone_number: '123-456-7890',
    avatar_url: 'https://example.com/avatars/jdoe.png',
    role: 'admin'
  },
  {
    username: 'asmith',
    first_name: 'Alice',
    middle_name: '',
    last_name: 'Smith',
    email: 'asmith@example.com',
    password_hash: BCrypt::Password.create('password'),
    phone_number: '555-555-5555',
    avatar_url: 'https://example.com/avatars/asmith.png',
    role: 'user'
  },
  {
    username: 'bjones',
    first_name: 'Bob',
    middle_name: 'C',
    last_name: 'Jones',
    email: 'bjones@example.com',
    password_hash: BCrypt::Password.create('password'),
    phone_number: '987-654-3210',
    avatar_url: 'https://example.com/avatars/bjones.png',
    role: 'user'
  }
])
