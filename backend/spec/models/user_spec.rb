require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) {
    User.create!(
      username: 'johnsmith',
      first_name: 'John',
      last_name: 'Smith',
      email: 'john.smith@test.com',
      password_hash: 'password',
      phone_number: '1234567899',
      avatar_url: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-1024.png'
    )
  }
 
  it 'is invalid without a username' do
    user.username = nil
    expect(user).not_to be_valid
  end

  it 'is invalid without a first_name' do
    user.first_name = nil
    expect(user).not_to be_valid
  end

  it 'is invalid without a last_name' do
    user.last_name = nil
    expect(user).not_to be_valid
  end

  it 'is invalid without an email' do
    user.email = nil
    expect(user).not_to be_valid
  end

  it 'is invalid without a password_hash' do
    user.password_hash = nil
    expect(user).not_to be_valid
  end

  it 'is invalid with a duplicate email' do
    User.create!(
      username: 'jane',
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'john.smith@test.com',
      password_hash: 'password',
      phone_number: '9876543210',
      avatar_url: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female2-1024.png'
    )

    duplicate_user = User.new(
      username: 'john2',
      first_name: 'John',
      last_name: 'Smith',
      email: 'john.smith@test.com',
      password_hash: 'password',
      phone_number: '1234567899',
      avatar_url: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-1024.png'
    )

    expect(duplicate_user).not_to be_valid
    expect(duplicate_user.errors[:email]).to include('has already been taken')
  end
end
