import React from "react";
import { useNavigate } from "react-router-dom";
import { format, differenceInCalendarDays, parseISO } from "date-fns";
import { FiArrowRight } from "react-icons/fi";

interface PropertyImage {
  url: string;
}

interface Property {
  id: number;
  name: string;
  city: string;
  state: string;
  property_images: PropertyImage[];
}

export interface Booking {
  id: number;
  start_date: string;
  end_date: string;
  payment_status: string;
  property: Property;
}

interface TripCardProps {
  booking: Booking;
}

const TripCard: React.FC<TripCardProps> = ({ booking }) => {
  const navigate = useNavigate();
  const { property, start_date, end_date, payment_status } = booking;

  const start = parseISO(start_date);
  const end = parseISO(end_date);
  const nights = differenceInCalendarDays(end, start);

  const sameMonth =
    format(start, "MMM") === format(end, "MMM") &&
    format(start, "yyyy") === format(end, "yyyy");

  const dateRange = sameMonth
    ? `${format(start, "MMM d")} – ${format(end, "d, yyyy")}`
    : `${format(start, "MMM d")} – ${format(end, "MMM d, yyyy")}`;

  const thumbnail = property.property_images?.[0]?.url;

  return (
    <div
      className="flex items-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
      onClick={() => navigate(`/trips/${booking.id}`)}
    >
      <div className="flex-shrink-0 w-40 h-[120px] rounded-lg overflow-hidden bg-gray-100">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={property.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      <div className="ml-4 flex-grow">
        <p className="text-base font-semibold text-gray-900">{property.name}</p>
        <p className="text-sm text-gray-500 mt-1">
          {dateRange} · {nights} {nights === 1 ? "night" : "nights"}
        </p>
        <div className="flex items-center mt-2">
          <span
            className={`inline-block w-2 h-2 rounded-full mr-2 ${
              payment_status === "complete" ? "bg-green-500" : "bg-yellow-400"
            }`}
          />
          <span className="text-sm text-gray-700">
            {payment_status === "complete" ? "Confirmed" : "Pending"}
          </span>
        </div>
      </div>

      <div className="ml-4 flex-shrink-0">
        <FiArrowRight className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default TripCard;
