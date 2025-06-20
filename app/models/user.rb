class User < ApplicationRecord
  has_secure_password
  has_many :properties
  has_many :bookings
  has_many :reviews

  validates :username, :first_name, :last_name, :email, :password_digest, :role, presence: true
  validates :role, inclusion: { in: ["admin", "user"] }
  validates :email, uniqueness: true
end
