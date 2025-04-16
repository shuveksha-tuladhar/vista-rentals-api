class User < ApplicationRecord
    has_many :properties
    has_many :bookings
    has_many :reviews

    validates :username, :first_name, :last_name, :email, :password_hash, presence: true
    validates :email, uniqueness: true
end
