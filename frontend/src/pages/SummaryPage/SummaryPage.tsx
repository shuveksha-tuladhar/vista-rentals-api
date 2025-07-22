import React, { useEffect, useState } from "react";
import BookingDetails from "./subcomponents/BookingDetails";
import SummaryCard from "./subcomponents/SummaryCard";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Property } from "../PropertyDetails/types/PropertyType";
import { getApi } from "../../utils/api";
import { calculateBookingCosts } from "../../utils/bookings";
import type { BookingCosts } from "../PropertyDetails/subcomponents/Bookings/types/BookingCostType";

const BookingSummary: React.FC = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const propertyId = searchParams.get("propertyId");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const numOfGuests = searchParams.get("numOfGuests");
  const refundable = searchParams.get("refundable") === "true";

  let bookingCosts: BookingCosts | null = null;

  if (!propertyId || !checkIn || !checkOut || !numOfGuests) {
    navigate("/500");
  }

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await getApi<Property>(`/properties/${propertyId}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:" + error);
        navigate("/500");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId, navigate]);

  if (property?.price && checkIn && checkOut) {
    bookingCosts = calculateBookingCosts(
      property?.price,
      checkIn,
      checkOut,
      refundable
    );

    console.log("Property:", property, bookingCosts.totalBeforeTaxes);
  }

  return (
    <>
      {!loading && (
        <>
          <div className="max-w-7xl mx-auto pt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Go back"
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-2xl font-semibold">Request to book</h1>
          </div>

          <div className="max-w-7xl mx-auto p-6 md:flex gap-8 items-start">
            {bookingCosts?.totalBeforeTaxes && (
              <BookingDetails total={bookingCosts.totalBeforeTaxes} />
            )}
            {property && bookingCosts && checkIn && checkOut && numOfGuests && (
              <SummaryCard
                property={property}
                bookingCosts={bookingCosts}
                checkInDate={checkIn}
                checkOutDate={checkOut}
                numOfGuests={numOfGuests}
                isRefundable={refundable}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default BookingSummary;
