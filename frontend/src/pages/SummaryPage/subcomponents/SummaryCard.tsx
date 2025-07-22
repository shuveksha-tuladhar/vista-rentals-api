import { format } from "date-fns";
import type { BookingCosts } from "../../PropertyDetails/subcomponents/Bookings/types/BookingCostType";
import type { Property } from "../../PropertyDetails/types/PropertyType";

interface SummaryCardProps {
  property: Property;
  bookingCosts: BookingCosts;
  checkInDate: string;
  checkOutDate: string;
  numOfGuests: string;
  isRefundable: boolean;
}

const SummaryCard = ({
  property,
  bookingCosts,
  checkInDate,
  checkOutDate,
  numOfGuests,
  isRefundable,
}: SummaryCardProps) => {
  const formattedCheckIn = format(new Date(checkInDate), "MMM d");
  const formattedCheckOut = format(new Date(checkOutDate), "d, yyyy");
  const parsedGuests = parseInt(numOfGuests, 10);
  const guestLabel =
    isNaN(parsedGuests) || parsedGuests <= 0
      ? "Guests"
      : `${parsedGuests} ${parsedGuests === 1 ? "guest" : "guests"}`;

  return (
    <div className="mt-8 md:mt-0 w-full md:w-[28rem] border rounded-2xl p-6 bg-white space-y-4 border-gray-300 shadow-sm">
      <div className="flex gap-4">
        <img
          src={property.property_images[0]?.url || "/placeholder.jpg"}
          alt={property.title}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div>
          <h2 className="font-medium">{property.title}</h2>
          <div className="text-sm text-gray-600">
            <span>
              ★ {property.rating} ({property.reviews.length}) • {property.city},{" "}
              {property.state}
            </span>
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold">Free cancellation</p>
        <p className="text-sm text-gray-600">
          Cancel within 24 hours for a full refund.
        </p>
      </div>

      <div>
        <div className="flex justify-between text-sm font-medium">
          <p>Trip details</p>
          <button className="text-gray-500 border rounded-md px-3 py-1 text-sm">
            Change
          </button>
        </div>
        <p className="text-sm text-gray-600">
          {formattedCheckIn} – {formattedCheckOut}
        </p>
        <p className="text-sm text-gray-600">{guestLabel}</p>{" "}
      </div>

      <div className="text-sm space-y-2">
        <p className="font-medium">Price details</p>
        <div className="flex justify-between">
          <span>
            ${bookingCosts.nightlyPrice.toFixed(2)} × {bookingCosts.nights}{" "}
            night{bookingCosts.nights > 1 ? "s" : ""}
          </span>
          <span>${bookingCosts.baseTotal.toFixed(2)}</span>
        </div>
        {bookingCosts.cleaningFee > 0 && (
          <div className="flex justify-between">
            <span>Cleaning fee</span>
            <span>${bookingCosts.cleaningFee.toFixed(2)}</span>
          </div>
        )}
        {bookingCosts.serviceFee > 0 && (
          <div className="flex justify-between">
            <span>Service fee</span>
            <span>${bookingCosts.serviceFee.toFixed(2)}</span>
          </div>
        )}
        {!isRefundable && bookingCosts.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>−${bookingCosts.discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-300 pt-2 text-sm font-medium flex justify-between">
        <span>Total USD</span>
        <span>${bookingCosts.totalBeforeTaxes.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default SummaryCard;
