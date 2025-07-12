import React from "react";
import Gallery from "./subcomponents/Gallery/Gallery";
import PropertyHeader from "./subcomponents/PropertyHeader/PropertyHeader";
import PropertyInfo from "./subcomponents/PropertyInfo/PropertyInfo";
import Amenities from "./subcomponents/Amenities/Amenities";
import Reviews from "./subcomponents/Reviews/Reviews";
import HostDetails from "./subcomponents/HostDetails/HostDetails";
import BookingSidebar from "./subcomponents/Bookings/BookingSidebar";
import ThingsToKnow from "./subcomponents/ThingsToKnow/ThingsToKnow";

const property = {
  id: 1,
  title: "Charming Studio in Central London",
  propertyType: "studio",
  description: `Quiet, cozy studio in the heart of Central London!

        The space  
        Modern, clean, and comfortable, perfect for solo travelers or couples.

        Enjoy this beautifully furnished studio apartment located close to London's top attractions and public transportation.

        Features:
        - Walking distance to iconic landmarks, shops, restaurants, and cafes
        - Easy access to public transport links, including buses and tube stations
        - Quiet and safe neighborhood with charming local vibes
        - Dedicated workspace ideal for remote work
        - Fully equipped kitchen for cooking and dining in
        - Cozy sleeping area with comfortable bed and linens
        - Washer and heating for convenience and comfort
        - Free Wi-Fi and Smart TV for entertainment

        Studio Basics:
        - Approximately 350 square feet
        - Separate private entrance
        - Well-lit open layout with natural light
        - Freshly cleaned and maintained
        - No smoking or pets allowed to ensure a clean environment

        Languages spoken: English and French

        NOTE: For a smooth check-in, please provide your trip details, number of guests, and estimated arrival and departure times.
  `,
  images: [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1442072486844571600/original/ecfb6004-befa-4e90-bc64-deb7012f6975.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1442072486844571600/original/ecfb6004-befa-4e90-bc64-deb7012f6975.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1442072486844571600/original/ecfb6004-befa-4e90-bc64-deb7012f6975.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1442072486844571600/original/ecfb6004-befa-4e90-bc64-deb7012f6975.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1442072486844571600/original/ecfb6004-befa-4e90-bc64-deb7012f6975.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1442072486844571600/original/ecfb6004-befa-4e90-bc64-deb7012f6975.jpeg?im_w=1200",
  ],
  location: "London, United Kingdom",
  rating: 4.8,
  distance: "2 miles away",
  startDate: "Jan 1, 2025",
  endDate: "Jan 6, 2025",
  price: "$120",
  guests: 2,
  beds: 1,
  baths: 1,
  amenities: [
    "Wi-Fi",
    "Kitchen",
    "Washer",
    "Heating",
    "Dedicated workspace",
    "Air conditioning",
    "Free parking on premises",
    "Breakfast",
    "TV",
    "Hair dryer",
    "Iron",
    "Hangers",
    "Laptop-friendly workspace",
    "Smoke detector",
    "Fire extinguisher",
    "First aid kit",
    "Carbon monoxide detector",
    "Essentials",
    "Hot water",
    "Shampoo",
    "Body soap",
    "Private entrance",
    "Pets allowed",
    "Wheelchair accessible",
    "Pool",
    "Gym",
    "Elevator",
    "Bathtub",
    "Garden or backyard",
    "BBQ grill",
  ],
  host: {
    name: "Shuveksha",
    avatar: "https://shuveksha-tuladhar.github.io/img/about-img.jpg",
    bio: "Superhost with 5 years of experience hosting in London.",
  },
  reviews: [
    {
      id: 1,
      author: "John",
      content: "Great place! Very clean and close to everything.",
      rating: 5,
    },
    {
      id: 2,
      author: "Sarah",
      content: "Comfortable stay and wonderful host.",
      rating: 4.5,
    },
    {
      id: 3,
      author: "John",
      content: "Great place! Very clean and close to everything.",
      rating: 5,
    },
    {
      id: 4,
      author: "Sarah",
      content: "Comfortable stay and wonderful host.",
      rating: 3.5,
    },
    {
      id: 5,
      author: "John",
      content: "Great place! Very clean and close to everything.",
      rating: 4,
    },
    {
      id: 3,
      author: "John",
      content: "Great place! Very clean and close to everything.",
      rating: 5,
    },
    {
      id: 4,
      author: "Sarah",
      content: "Comfortable stay and wonderful host.",
      rating: 3.5,
    },
    {
      id: 5,
      author: "John",
      content: "Great place! Very clean and close to everything.",
      rating: 4,
    },
    {
      id: 3,
      author: "John",
      content: "Great place! Very clean and close to everything.",
      rating: 5,
    },
    {
      id: 4,
      author: "Sarah",
      content: "Comfortable stay and wonderful host.",
      rating: 3.5,
    },
    {
      id: 5,
      author: "John",
      content: "Great place! Very clean and close to everything.",
      rating: 4,
    },
    {
      id: 3,
      author: "John",
      content: "Great place! Very clean and close to everything.",
      rating: 5,
    },
    {
      id: 4,
      author: "Sarah",
      content: "Comfortable stay and wonderful host.",
      rating: 3.5,
    },
    {
      id: 5,
      author: "John",
      content: "Great place! Very clean and close to everything.",
      rating: 4,
    },
    {
      id: 3,
      author: "John",
      content: "Great place! Very clean and close to everything.",
      rating: 5,
    },
    {
      id: 4,
      author: "Sarah",
      content: "Comfortable stay and wonderful host.",
      rating: 3.5,
    },
    {
      id: 5,
      author: "John",
      content: "Great place! Very clean and close to everything.",
      rating: 4,
    },
  ],
  rules: ["No smoking", "No pets", "No parties"],
  safetyNotes: [
    "Smoke detector installed in sleeping area and kitchen.",
    "Fire extinguisher located under the kitchen sink.",
    "First aid kit available in the bathroom cabinet.",
    "Carbon monoxide detector active and tested regularly.",
    "Emergency contact numbers posted near entrance.",
  ],
  cancellationPolicy:
    "Free cancellation within 48 hours of booking. After that, cancel up to 5 days before check-in for a full refund. No refunds for cancellations made within 5 days of check-in.",
  coordinates: {
    lat: 51.5074,
    lng: -0.1278,
  },
};

const PropertyDetails: React.FC = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full flex flex-col gap-6 px-4 md:px-16 lg:px-24 mt-6">
      <h1 className="text-2xl font-semibold text-gray-900">{property.title}</h1>
      <Gallery images={property.images} />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-6">
          <PropertyHeader
            propertyType={property.propertyType}
            location={property.location}
            rating={property.rating}
            guests={property.guests}
            beds={property.beds}
            baths={property.baths}
            reviewsCount={property.reviews.length ?? 0}
          />
          <PropertyInfo description={property.description} />
          <Amenities amenities={property.amenities} />
        </div>
        <div className="lg:w-[400px]">
          <div className="lg:sticky top-28">
            <BookingSidebar
              price={property.price}
              startDate={property.startDate}
              endDate={property.endDate}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-6">
          <Reviews reviews={property.reviews} />
          <HostDetails host={property.host} />
          <ThingsToKnow
            rules={property.rules}
            safetyNotes={property.safetyNotes}
            cancellationPolicy={property.cancellationPolicy}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
