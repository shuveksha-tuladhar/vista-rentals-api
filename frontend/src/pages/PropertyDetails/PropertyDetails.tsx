import React, { useCallback, useEffect, useRef, useState } from "react";
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
import FavoriteButton from "../../components/FavoriteButton";
import type { Property } from "./types/PropertyType";
import { getApi } from "../../utils/api";
import { expandBookedRangesToDates } from "../../utils/dates";
import { useLoader } from "../../context/LoaderContext";

const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIsLoading } = useLoader();

  const [property, setProperty] = useState<Property | null>(null);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  type AiSummaryStatus = "idle" | "loading" | "available" | "failed";
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [aiSummaryStatus, setAiSummaryStatus] = useState<AiSummaryStatus>("idle");
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollCountRef = useRef(0);
  const MAX_POLL_ATTEMPTS = 20;

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearTimeout(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  const pollAiSummary = useCallback(
    async (propertyId: string) => {
      if (pollCountRef.current >= MAX_POLL_ATTEMPTS) {
        setAiSummaryStatus("failed");
        return;
      }
      pollCountRef.current += 1;

      const { data } = await getApi<{
        ai_summary: string | null;
        pending: boolean;
        failed: boolean;
      }>(`/properties/${propertyId}/ai-summary`);

      if (data?.ai_summary) {
        setAiSummary(data.ai_summary);
        setAiSummaryStatus("available");
        return;
      }

      if (data?.failed) {
        setAiSummaryStatus("failed");
        return;
      }

      pollTimerRef.current = setTimeout(() => pollAiSummary(propertyId), 3000);
    },
    []
  );

  useEffect(() => {
    if (!property) return;

    stopPolling();
    pollCountRef.current = 0;

    if (property.ai_summary) {
      setAiSummary(property.ai_summary);
      setAiSummaryStatus("available");
    } else if (property.reviews.length >= 3) {
      setAiSummaryStatus("loading");
      pollAiSummary(property.id.toString());
    }

    return stopPolling;
  }, [property?.id]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setIsLoading(true);
      const { data, error } = await getApi<Property>(`/properties/${id}`);
      setIsLoading(false);
      
      if (error) {
        console.error("Error fetching property details:", error);
        if (error.status === 404) {
          navigate("/404");
        } else {
          navigate("/500");
        }
      } else {
        setProperty(data);
        const bookedResponse = await getApi<{ booked_dates: { start_date: string; end_date: string }[] }>(
          `/properties/${id}/booked-dates`
        );
        if (bookedResponse.data) {
          setDisabledDates(expandBookedRangesToDates(bookedResponse.data.booked_dates));
        }
      }
    };

    fetchPropertyDetails();
  }, [id, navigate, setIsLoading]);

  if (!property) return null;

  return (
    property != null && (
      <div className="max-w-screen-2xl mx-auto w-full flex flex-col gap-6 px-4 md:px-16 lg:px-24 mt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            {property.title}
          </h1>
          <FavoriteButton propertyId={property.id} size="lg" />
        </div>
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
                maxGuests={property.max_guests}
                propertyId={property.id}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            <Reviews
              reviews={property.reviews}
              aiSummary={aiSummary}
              aiSummaryStatus={aiSummaryStatus}
            />
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
