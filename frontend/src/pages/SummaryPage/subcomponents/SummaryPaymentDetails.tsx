import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAuthStore } from "../../../store/authStore";
import CheckoutForm from "./CheckoutForm";
import { postApi } from "../../../utils/api";

interface Props {
  isVisible: boolean;
  total: number;
  propertyId: string | null;
  checkInDate: string | null;
  checkOutDate: string | null;
  isRefundable: boolean;
}

interface PaymentResponse {
  clientSecret: string;
}

// Initialized once outside the component to prevent Stripe from re-mounting
// Elements on every render, which breaks the payment form.
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
);

const SummaryPaymentDetails = ({
  isVisible,
  total,
  propertyId,
  checkInDate,
  checkOutDate,
  isRefundable,
}: Props) => {
  const { isLoggedIn } = useAuthStore();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn || clientSecret) return;

    postApi<PaymentResponse>("/checkout/create", {
      amount: total * 100,
    }).then((response) => setClientSecret(response.data?.clientSecret ?? null));
  }, [isLoggedIn, clientSecret, total]);

  return (
    <div className="bg-white border rounded-2xl p-6 border-gray-300">
      <div className="font-medium mb-4">
        2. Add a payment and complete reservation
      </div>

      {clientSecret && isVisible && isLoggedIn && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            propertyId={propertyId}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            isRefundable={isRefundable}
          />
        </Elements>
      )}
      {!clientSecret && isLoggedIn && <p>Loading</p>}
    </div>
  );
};

export default SummaryPaymentDetails;
