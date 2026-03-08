# frozen_string_literal: true

# This seeder file creates a realistic and reputation-based set of reviews for all properties.

properties = Property.all
users = User.all

# --- Review Template Pools ---
# A mix of short and long reviews for more variety.

EXCELLENT_REVIEWS = [
  'Perfect spot!', 'Loved it, will be back.', "Couldn't be better.", 'A 5-star stay.', 'Absolutely flawless.',
  'Incredible experience.', 'Truly exceptional.', 'Highly recommended!', 'A real gem.', 'Stunning property.',
  'Impeccably clean.', 'Picture perfect.', 'Will definitely return.', 'Exceeded all expectations.', 'Top-notch.',
  'Simply the best.', 'Seamless check-in, beautiful place.', 'Perfect in every way.', 'Location is A+.',
  'Book this place now!', 'Everything was perfect.', 'What a find!', 'Magical experience.', 'Outstanding hospitality.',
  'Pristine and stylish.', 'A quiet oasis.', '10/10 would recommend.', 'An absolute delight.', 'A memorable stay.',
  'Our stay was absolutely perfect from start to finish. The host was incredibly communicative and provided us with all the information we needed for a smooth check-in. The property itself was sparkling clean, beautifully decorated, and had all the amenities you could ask for. We especially loved the quiet neighborhood and the comfortable bed. We will definitely be recommending this place to all our friends and family.',
  "This has been one of our favorite rental experiences. The attention to detail in this home is just incredible. It's stylish, comfortable, and equipped with high-quality appliances and furnishings. The location is ideal—close enough to walk to great restaurants and shops but on a quiet street that allows for a peaceful night's sleep. We can't wait for an opportunity to return.",
  'What a fantastic find! The property is even more beautiful in person than it is in the pictures. It was the perfect size for our family, and we had plenty of space to relax. The host went above and beyond to make us feel welcome, including leaving a detailed guide with local recommendations. We tried a few of them and were not disappointed. A 5-star experience all around.',
  "If you're looking for a relaxing getaway, look no further. This place is a sanctuary. It was spotlessly clean, the kitchen had everything we needed to cook our own meals, and the view from the living room was breathtaking. We spent most of our time just enjoying the peace and quiet. The host was gracious and respected our privacy. We left feeling completely refreshed.",
  'From the moment we walked in, we were impressed. The space is bright, airy, and thoughtfully designed. Every little detail has been considered to make for a comfortable stay. The location is superb, putting all the main attractions within easy reach. Communication with the host was prompt and helpful. This property is a true gem and we feel so lucky to have found it.',
  "A wonderful retreat from the city. The property was even better than described, with modern touches and a very cozy atmosphere. The host was fantastic and gave us some great tips for local hiking trails. Can't recommend this place enough.",
  "We had an amazing time. The apartment is in a perfect location, with easy access to everything. It was clean, quiet, and had a very comfortable bed. The host's communication was excellent. We would definitely stay here again without hesitation.",
  "This was a flawless stay. The host has thought of absolutely everything to make guests feel at home. The apartment is beautifully furnished, spotlessly clean, and packed with thoughtful amenities. It's the little things that make a difference, and this place nails it.",
  "The best rental I've ever stayed in. The quality of the property, the location, and the hospitality were all first-class. It was worth every penny, and I would book it again in a heartbeat. If you're considering this place, just book it."
].freeze

GOOD_REVIEWS = [
  'Very good, no complaints.', 'Solid choice for a weekend.', 'Nice place, great location.', 'A great experience overall.',
  'Really enjoyed our stay.', 'Comfortable and clean.', 'The host was very responsive.', 'Would stay here again.',
  'Great value for what you get.', 'The location was fantastic.', 'A pleasant and easy stay.', 'Everything was as expected.',
  'A lovely apartment.', 'Check-in was a breeze.', 'Good amenities.', 'A solid 4-star experience.', 'Very clean and tidy.',
  'We had a great time.', 'A comfortable base for our trip.', 'The kitchen was well-stocked.', 'A great little spot.',
  'The host was helpful.', 'Everything went smoothly.', 'A very nice property.', 'Met our needs perfectly.', 'Good for a family trip.',
  "We had a really great stay here. The apartment was clean, comfortable, and had almost everything we needed. The location is excellent, just a short walk from the city center. Our only minor issue was that the Wi-Fi was a bit slow in the evenings, but it wasn't a dealbreaker. The host was friendly and quick to respond to our questions. We would happily recommend this place.",
  "This was a very solid choice for our trip. The property was accurately described in the listing, and the check-in process was incredibly simple. We found the beds to be comfortable and the living area was a nice place to relax after a long day of sightseeing. For the price, it offers fantastic value. We'd definitely consider staying here again on a future visit.",
  "A very pleasant stay overall. The host was proactive and communicative, making sure we had everything we needed. The apartment was clean and tidy, and the neighborhood felt very safe. It's a bit of a walk to the main tourist sites, but public transport is conveniently close. A great option for those looking for a quiet and comfortable home base.",
  'We enjoyed our time at this property. It was well-maintained and the kitchen had enough equipment for us to prepare a few simple meals. The best part was the location, which was perfect for exploring. The decor is a little dated, but everything was functional and clean. A reliable and good-value option for a city break.',
  "A good, solid rental. The apartment was spacious enough for the three of us and the host was very accommodating with our check-in time. Everything was clean and in good working order. It's not a luxury property, but it's a comfortable, practical, and affordable place to stay in a great part of town. No major complaints from us.",
  "Overall, we were very happy with our stay. The apartment is in a great neighborhood and feels very secure. It was clean and the host provided all the necessary information for a smooth trip. It could benefit from a few more personal touches, but it's a great functional space.",
  "This property was a great find. It was clean, the bed was comfortable, and the location couldn't be beat. The host was easy to get in touch with. The only small downside was that the street could be a little noisy in the morning, but that's to be expected in such a central location. Would recommend.",
  "We had a pleasant stay. The apartment was well-equipped and everything was in working order. Check-in and check-out were very easy. It's a great place if you plan to be out and about for most of your trip. Good value for money."
].freeze

AVERAGE_REVIEWS = [
  'It was fine.', 'Did the job.', 'Okay for the price.', 'Met expectations.', 'An average stay.', 'It was okay.',
  'The location is the best thing about it.', 'Good enough for a short stay.', 'No major problems.', 'You get what you pay for.',
  'It was a decent place to sleep.', 'The apartment was clean enough.', 'The bed was a bit uncomfortable.', "It's a functional space.",
  'The kitchen is very basic.', 'Fine for a night or two.', 'It served its purpose.', 'The Wi-Fi was spotty.', "Okay, but wouldn't rush back.",
  'A very basic accommodation.', 'It was smaller than I thought.', 'The essentials were there.', 'Not bad, but not great either.',
  "The stay was adequate. The location was very convenient, which was the main reason we booked. However, the apartment itself was just okay. The furniture is showing some wear and tear, and the walls are quite thin, so we could hear the neighbors easily. It was clean enough, but didn't feel sparkling. It's a fine place to crash for a night if you're not planning on spending much time there.",
  "This place is okay if you're on a tight budget. It served its purpose as a place to sleep, but it wasn't particularly comfortable. The mattress was old and the pillows were flat. The host was also a bit slow to respond to our message about the coffee maker not working. For the price, it's what you might expect, but don't anticipate any luxuries.",
  "An average experience. Check-in was straightforward, but the apartment could have used a more thorough cleaning. We found some dust and the floors were a bit sticky. It's a functional space and the location is good, but it lacks any character or comfort. It's a very transactional-feeling rental, fine if you just need a bed.",
  "The best thing about this rental is the location. Beyond that, it was a fairly mediocre stay. The photos in the listing are definitely flattering; the space felt much more cramped and dated in person. The host was polite but didn't offer any personal touches. It was an acceptable, if unmemorable, home base for our trip.",
  "The property is fine for what it is. A no-frills place to stay in a great location. The host communicated via automated messages, which felt a bit impersonal. The apartment was tidy on the surface, but could use a deep clean. It's an acceptable option if you're not picky and just need somewhere to sleep."
].freeze

BAD_REVIEWS_2_STARS = [
  'The location was convenient, but the apartment was not as clean as we had hoped. We found hair in the bathroom and the kitchen surfaces were sticky. We had to do some cleaning ourselves before we felt comfortable.',
  'Host was unresponsive when we had an issue with the heating, which was a major problem as it was very cold during our stay. We messaged multiple times and never got a satisfactory resolution. It put a real damper on our trip.',
  'Be aware that this place is much smaller and darker than the photos suggest. The whole place felt a bit grubby, and there was a persistent musty smell. We were pretty disappointed with the reality versus the listing.',
  "The noise from the bar directly downstairs was unbearable, going on until 2 AM even on a weeknight. The listing mentioned 'lively neighborhood' but failed to disclose this. We barely got any sleep during our entire stay.",
  "The Wi-Fi was non-functional for the duration of our trip, which was a huge issue as I needed to do some work. The host's suggestions were generic and didn't fix the problem. We ended up having to use our phone hotspots, which was an unexpected expense."
].freeze

BAD_REVIEWS_1_STAR = [
  "Avoid this place at all costs. The photos are completely deceptive. The property was dirty, there was a strange smell we couldn't get rid of, and several of the listed amenities were either broken or missing. A total rip-off.",
  "A truly terrible experience from start to finish. The host was rude and unhelpful when we reported that the key wasn't in the lockbox. The place itself was in poor condition and didn't feel safe. We left after one night and had to find a hotel.",
  'If I could give zero stars, I would. This was a scam. The property was nothing like what was advertised, and it was in a completely different neighborhood than the one listed. We had to contact support and book a hotel last minute. Do not book.',
  'The bed was broken, the entire apartment was filthy, and we found evidence of pests. It was a nightmare. This listing is a health hazard and should be removed from the platform immediately. We have reported it.'
].freeze

if users.any? && properties.any?
  properties.each do |property|
    reputation_seed = rand
    reputation = if reputation_seed < 0.4
                   'excellent'
                 elsif reputation_seed < 0.8
                   'good'
                 else
                   'average'
                 end

    reviewers = users.sample(rand(8..15))
    created_reviews_count = 0

    case reputation
    when 'excellent'
      rand(8..12).times do
        reviewer = reviewers.pop
        next if !reviewer || property.user_id == reviewer.id

        Review.create!(property: property, user: reviewer, rating: 5, review: EXCELLENT_REVIEWS.sample,
                       created_at: Time.now - rand(1..365).days)
        created_reviews_count += 1
      end
      rand(0..2).times do
        reviewer = reviewers.pop
        next if !reviewer || property.user_id == reviewer.id

        Review.create!(property: property, user: reviewer, rating: rand(3..4),
                       review: (GOOD_REVIEWS + AVERAGE_REVIEWS).sample, created_at: Time.now - rand(1..365).days)
        created_reviews_count += 1
      end

    when 'good'
      rand(7..10).times do
        reviewer = reviewers.pop
        next if !reviewer || property.user_id == reviewer.id

        Review.create!(property: property, user: reviewer, rating: 4, review: GOOD_REVIEWS.sample,
                       created_at: Time.now - rand(1..365).days)
        created_reviews_count += 1
      end
      rand(1..3).times do
        reviewer = reviewers.pop
        next if !reviewer || property.user_id == reviewer.id

        rating = [3, 5].sample
        review_text = rating == 5 ? EXCELLENT_REVIEWS.sample : AVERAGE_REVIEWS.sample
        Review.create!(property: property, user: reviewer, rating: rating, review: review_text,
                       created_at: Time.now - rand(1..365).days)
        created_reviews_count += 1
      end

    when 'average'
      rand(6..9).times do
        reviewer = reviewers.pop
        next if !reviewer || property.user_id == reviewer.id

        Review.create!(property: property, user: reviewer, rating: 3, review: AVERAGE_REVIEWS.sample,
                       created_at: Time.now - rand(1..365).days)
        created_reviews_count += 1
      end
      rand(1..4).times do
        reviewer = reviewers.pop
        next if !reviewer || property.user_id == reviewer.id

        rating = [1, 2, 4, 5].sample
        review_text = case rating
                      when 5 then EXCELLENT_REVIEWS.sample
                      when 4 then GOOD_REVIEWS.sample
                      when 2 then BAD_REVIEWS_2_STARS.sample
                      when 1 then BAD_REVIEWS_1_STAR.sample
                      end
        Review.create!(property: property, user: reviewer, rating: rating, review: review_text,
                       created_at: Time.now - rand(1..365).days)
        created_reviews_count += 1
      end
    end
    puts "Seeded #{created_reviews_count} reviews for property '#{property.name}' with a reputation of '#{reputation}'"
  end
else
  puts 'No users or properties available to create reviews.'
end
