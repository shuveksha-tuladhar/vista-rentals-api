import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getApi, patchApi } from "../../utils/api";
import type { BookingResponse } from "../SummaryPage/subcomponents/CheckoutForm";
import { calculateBookingCosts } from "../../utils/bookings";
import type { BookingCosts } from "../PropertyDetails/subcomponents/Bookings/types/BookingCostType";
import SummaryCard from "../SummaryPage/subcomponents/SummaryCard";
import { FaArrowLeft } from "react-icons/fa6";
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
    null
  );

  const [loading, setLoading] = useState(true);
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
      bookingSummary.is_refundable
    );
  }

  useEffect(() => {
    const fetchPaymentIntentStatus = async () => {
      if (!paymentIntentId) {
        setError("Missing payment intent ID in URL");
        setLoading(false);
        return;
      }

      try {
        const response = await getApi<PaymentSummary>(
          `/checkout/payment-intent-status/${paymentIntentId}`
        );

        if (response.error) {
          throw Error("Error with payment");
        }

        const responseBooking = await patchApi<BookingResponse>(
          `/bookings/${bookingId}`,
          {
            payment_token: response.data?.id,
          }
        );

        if (responseBooking.data) {
          setBookingSummary(responseBooking.data);
        }

        if (responseBooking.error) {
          throw Error("Failed to update the booking in the backend");
        }

        setSummary(response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err: unknown) {
        setError("Error with payment/bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentIntentStatus();
  }, [paymentIntentId, bookingId]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading payment details...
      </div>
    );
  }

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
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <div className="max-w-7xl mx-auto pt-4 my-4 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-semibold">Back to Home</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-xl border border-gray-200 p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-red-500">
              {isSuccess ? "Booking Confirmed" : "Payment Failed"}
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Here’s your payment summary:
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Payment Status:</span>{" "}
              <span className="capitalize">{summary.status}</span>
            </p>
            <p>
              <span className="font-semibold">Payment Intent ID:</span>{" "}
              {summary.id}
            </p>
            <p>
              <span className="font-semibold">Amount Paid:</span> $
              {(summary.amount_received / 100).toFixed(2)}{" "}
              {summary.currency?.toUpperCase()}
            </p>
          </div>
        </div>

        {bookingSummary?.property && bookingCosts && (
          <div className="w-full lg:w-1/2">
            <SummaryCard
              property={bookingSummary.property}
              bookingCosts={bookingCosts}
              checkInDate={bookingSummary.start_date}
              checkOutDate={bookingSummary.end_date}
              isRefundable={bookingSummary.is_refundable}
              bookingComplete
            />
          </div>
        )}
      </div>
    </div>
  );
}
