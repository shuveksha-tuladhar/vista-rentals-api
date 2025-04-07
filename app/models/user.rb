class User < ApplicationRecord
    has_many :properties
    has_many :bookings
    has_many :reviews

    validates :username, :email, :password_hash, presence: true
    validates :email, uniqueness: true
end
