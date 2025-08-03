import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Gallery from "./subcomponents/Gallery/Gallery";
import PropertyHeader from "./subcomponents/PropertyHeader/PropertyHeader";
import PropertyInfo from "./subcomponents/PropertyInfo/PropertyInfo";
import Amenities from "./subcomponents/Amenities/Amenities";
import Reviews from "./subcomponents/Reviews/Reviews";
import HostDetails from "./subcomponents/HostDetails/HostDetails";
import BookingSidebar from "./subcomponents/Bookings/BookingSidebar";
import ThingsToKnow from "./subcomponents/ThingsToKnow/ThingsToKnow";
import WhereYouWillSleep from "./subcomponents/WhereYouWillSleep/WhereYouWillSleep";
import type { Property } from "./types/PropertyType";
import { getApi } from "../../utils/api";
import { addDays } from "date-fns";

const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await getApi<Property>(`/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:" + error);
        navigate("/500");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id, navigate]);

  if (loading) return null;

  return (
    property != null && (
      <div className="max-w-screen-2xl mx-auto w-full flex flex-col gap-6 px-4 md:px-16 lg:px-24 mt-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {property.title}
        </h1>
        <Gallery images={property.property_images} />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            <PropertyHeader
              propertyType={property.property_type}
              location={`${property.city}, ${property.country}`}
              rating={property.rating}
              guests={property.max_guests}
              beds={property.bedrooms}
              baths={property.baths}
              reviewsCount={property.reviews.length ?? 0}
            />
            <PropertyInfo description={property.description} />
            <WhereYouWillSleep bedInfo={property.property_bed_infos} />
            <Amenities amenities={property.amenities} />
          </div>
          <div className="lg:w-[400px]">
            <div className="lg:sticky top-28">
              <BookingSidebar
                price={property.price}
                startDate={addDays(new Date(), 7).toISOString()}
                endDate={addDays(new Date(), 9).toISOString()}
                maxGuests={property.max_guests}
                propertyId={property.id}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            <Reviews reviews={property.reviews} />
            <HostDetails hostInfo={property.user} />
            <ThingsToKnow
              rules={property.property_rules}
              safetyNotes={property.property_safety_notes}
              cancellationPolicy={property.cancellation_policy}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default PropertyDetails;
