import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getApi, patchApi } from "../../utils/api";
import type { BookingResponse } from "../SummaryPage/subcomponents/CheckoutForm";
import { calculateBookingCosts } from "../../utils/bookings";
import type { BookingCosts } from "../PropertyDetails/subcomponents/Bookings/types/BookingCostType";
import { useLoader } from "../../context/LoaderContext";

interface PaymentSummary {
  status: string;
  amount_received: number;
  currency: string;
  id: string;
  payment_method_types?: string[];
}

export default function BookingComplete() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [summary, setSummary] = useState<PaymentSummary | null>(null);
  const [bookingSummary, setBookingSummary] = useState<BookingResponse | null>(
    null,
  );

  const { setIsLoading } = useLoader();

  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paymentIntentId = searchParams.get("payment_intent");
  const bookingId = searchParams.get("booking_id");

  let bookingCosts: BookingCosts | null = null;

  if (
    bookingSummary?.property?.price &&
    bookingSummary?.start_date &&
    bookingSummary?.end_date
  ) {
    bookingCosts = calculateBookingCosts(
      bookingSummary.property?.price,
      new Date(bookingSummary.start_date),
      new Date(bookingSummary.end_date),
      bookingSummary.is_refundable,
    );
  }

  useEffect(() => {
    const fetchPaymentIntentStatus = async () => {
      if (!paymentIntentId) {
        setError("Missing payment intent ID in URL");
        return;
      }

      try {
        setIsLoading(true);
        const response = await getApi<PaymentSummary>(
          `/checkout/payment-intent-status/${paymentIntentId}`,
        );

        if (response.error) {
          throw Error("Error with payment");
        }

        const responseBooking = await patchApi<BookingResponse>(
          `/bookings/${bookingId}`,
          {
            payment_token: response.data?.id,
          },
        );

        if (responseBooking.data) {
          setBookingSummary(responseBooking.data);
          setSummary(response.data);
        } else {
          throw Error("Failed to update the booking in the backend");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err: unknown) {
        setError("Error with payment/bookings.");
      } finally {
        setIsLoading(false);
        setFetching(false);
      }
    };

    fetchPaymentIntentStatus();
  }, [paymentIntentId, bookingId, setIsLoading]);

  if (fetching) return null;

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!summary) {
    return (
      <div className="text-center mt-10 text-red-500">
        Payment information not available.
      </div>
    );
  }

  const isSuccess = summary.status === "succeeded";

  return (
    <div className="bg-white flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <p
            className={`text-3xl font-semibold ${isSuccess ? "text-green-600" : "text-red-600"}`}
          >
            {isSuccess ? "Booking Confirmed!" : "Payment Failed"}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {isSuccess
              ? "Your reservation is all set. Check your trips for details."
              : "Something went wrong with your payment. Please try again."}
          </p>
        </div>

        {bookingSummary?.property && bookingCosts && (
          <div className="border border-gray-200 mb-6">
            <div className="flex gap-4 p-4 border-b border-gray-100">
              {bookingSummary.property.property_images?.[0]?.url && (
                <img
                  src={bookingSummary.property.property_images[0].url}
                  alt={bookingSummary.property.name}
                  className="w-20 h-20 object-cover flex-shrink-0"
                />
              )}
              <div>
                <p className="font-medium text-black text-sm">
                  {bookingSummary.property.name ??
                    bookingSummary.property.title}
                </p>
                <p className="text-gray-500 text-sm">
                  {bookingSummary.property.city},{" "}
                  {bookingSummary.property.state}
                </p>
                {bookingSummary.property.rating && (
                  <p className="text-sm text-gray-500 mt-1">
                    &#9733; {bookingSummary.property.rating}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Check-in
                </p>
                <p className="text-sm font-medium text-black mt-1">
                  {new Date(bookingSummary.start_date).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" },
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Check-out
                </p>
                <p className="text-sm font-medium text-black mt-1">
                  {new Date(bookingSummary.end_date).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" },
                  )}
                </p>
              </div>
            </div>

            <div className="p-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>
                  ${bookingCosts.nightlyPrice.toFixed(2)} x{" "}
                  {bookingCosts.nights} night
                  {bookingCosts.nights !== 1 ? "s" : ""}
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
              {!bookingSummary.is_refundable && bookingCosts.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${bookingCosts.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-black">
                <span>Total USD</span>
                <span>${bookingCosts.totalBeforeTaxes.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {summary && (
          <div className="text-sm text-gray-600 mb-6 space-y-1">
            <p>
              Amount charged:{" "}
              <span className="font-medium text-black">
                ${(summary.amount_received / 100).toFixed(2)}{" "}
                {summary.currency?.toUpperCase()}
              </span>
            </p>
            {bookingSummary && (
              <p>
                Cancellation policy:{" "}
                <span className="font-medium text-black">
                  {bookingSummary.is_refundable
                    ? "Free cancellation"
                    : "Non-refundable"}
                </span>
              </p>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex-1 border border-gray-300 text-sm font-medium text-gray-700 px-4 py-2"
          >
            Explore Properties
          </button>
          <button
            onClick={() => navigate("/trips")}
            className="flex-1 bg-red-600 text-white text-sm font-medium px-4 py-2"
          >
            View My Trips
          </button>
        </div>
      </div>
    </div>
  );
}
