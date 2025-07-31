import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAuthStore } from "../../../store/authStore";
import { patchApi, postApi } from "../../../utils/api";
import { useToastStore } from "../../../store/toastStore";

interface CheckoutFormProps {
  propertyId: string | null;
  checkInDate: string | null;
  checkOutDate: string | null;
  isRefundable: boolean;
}

export interface BookingResponse {
  id: number;
  user_id: number;
  property_id: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  is_refundable: boolean;
  payment_token: string;
  payment_status: "pending" | "complete" | "failed";
}

const CheckoutForm = ({
  propertyId,
  checkInDate,
  checkOutDate,
  isRefundable,
}: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthStore();
  const { addToast } = useToastStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!user?.id || !propertyId || !checkInDate || !checkOutDate) return;

    setLoading(true);
    const responseBooking = await postApi<BookingResponse>("/bookings", {
      user_id: user.id,
      property_id: propertyId,
      start_date: checkInDate,
      end_date: checkOutDate,
      is_refundable: isRefundable,
    });

    if (responseBooking.error) {
      console.error("Error saving bookings");
      addToast({ message: "There was an error with booking", type: "error" });
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/complete?payment_intent_client_secret={PAYMENT_INTENT_CLIENT_SECRET}&booking_id=${responseBooking.data.id}`,
      },
    });

    if (error) {
      setError(error.message ?? "Payment failed");
      setLoading(false);

      const responseUpdatedBooking = await patchApi<BookingResponse>(
        `/bookings/${responseBooking.data.id}`,
        {
          payment_token: "",
        }
      );

      if (responseUpdatedBooking.error) {
        console.error("Error saving bookings");
        addToast({ message: "There was an error with booking", type: "error" });
        return;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <PaymentElement id="payment-element" />

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="text-sm text-gray-600">
        By clicking "Confirm and Pay", I agree to the charges and terms of
        service.
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-[#FF385C] text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Processing..." : "Confirm and Pay"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
