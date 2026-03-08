require 'securerandom'

jdoe = User.find_by(username: "jdoe")
if jdoe.nil?
  puts "User 'jdoe' not found. Skipping bookings seed."
  return
end

properties = Property.where(user_id: jdoe.id)
if properties.empty?
  puts "No properties found for 'jdoe'. Skipping bookings seed."
  return
end

guests = User.where.not(id: jdoe.id).to_a
if guests.empty?
  puts "No other users found to act as guests. Skipping bookings seed."
  return
end

current_date = Date.current # e.g., March 7, 2026

# Start from 11 months ago (April 2025) to cover past 12 months for historical data
start_period = current_date.beginning_of_month - 11.months
# End at the end of the current year (December 2026)
end_period = current_date.end_of_year

puts "Seeding Bookings for jdoe's properties from #{start_period.strftime('%b %Y')} to #{end_period.strftime('%b %Y')}..."

# Iterate through each unique month from start_period to end_period
(start_period..end_period).map(&:beginning_of_month).uniq.each do |month_start|
  year = month_start.year
  month = month_start.month

  # Determine number of bookings based on whether it's historical or current/future
  # Historical (up to current month's start) gets 1-2 bookings
  # Current/Future (from current month's start) gets 2-3 bookings
  num_bookings = if month_start < current_date.beginning_of_month
                   rand(1..2)
                 else
                   rand(2..3)
                 end

  bookings_created = 0
  attempts = 0

  while bookings_created < num_bookings && attempts < 30
    # Pick a random start day that allows for a few days duration, avoiding end of month to prevent Date::Error
    day = rand(1..22)
    duration = rand(2..5) # Booking duration between 2 and 5 days

    begin
      booking_start_date = Date.new(year, month, day)
      booking_end_date = booking_start_date + duration.days

      # Ensure created_at is before start_date for realism
      created_at = booking_start_date - rand(5..20).days
      created_at = created_at.beginning_of_day # Ensure it's a DateTime

      booking = Booking.new(
        property: properties.sample, # Assign to a random property of jdoe
        user: guests.sample,        # Assign to a random guest user
        start_date: booking_start_date,
        end_date: booking_end_date,
        payment_status: "complete", # Assume bookings are complete for revenue calculation
        is_refundable: [true, false].sample,
        payment_token: "seed_token_#{SecureRandom.hex(4)}",
        created_at: created_at,
        updated_at: created_at
      )

      if booking.save
        bookings_created += 1
      end
    rescue Date::Error
      # Catch and ignore errors for invalid dates (e.g., trying to create Feb 30)
    end
    attempts += 1
  end
end

puts "Finished seeding Bookings for jdoe."
