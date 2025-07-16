# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
load Rails.root.join("db", "seeds", "dropAll.rb")
load Rails.root.join("db", "seeds", "users.rb")
load Rails.root.join("db", "seeds", "hosts.rb")
load Rails.root.join("db", "seeds", "properties.rb")
load Rails.root.join("db", "seeds", "properties_images.rb")
load Rails.root.join("db", "seeds", "properties_rules.rb")
load Rails.root.join("db", "seeds", "properties_safety_notes.rb")
load Rails.root.join("db", "seeds", "properties_bed_info.rb")
load Rails.root.join("db", "seeds", "amenities.rb")
load Rails.root.join("db", "seeds", "properties_amenities_mapping.rb")
load Rails.root.join("db", "seeds", "properties_reviews.rb")
