import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAuthStore } from "../../../store/authStore";
import CheckoutForm from "./CheckoutForm";
import { postApi } from "../../../utils/api";

interface Props {
  isVisible: boolean;
  total: number;
}

interface PaymentResponse {
  clientSecret: string;
}

const SummaryPaymentDetails = ({ isVisible, total }: Props) => {
  const { isLoggedIn } = useAuthStore();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
  );

  useEffect(() => {
    if (!clientSecret) {
      postApi<PaymentResponse>("/checkout/create", { amount: total * 100 }).then(
        (response) => setClientSecret(response.data?.clientSecret ?? null)
      );
    }
  }, [clientSecret, total]);

  return (
    <div className="bg-white border rounded-2xl p-6 border-gray-300 shadow-sm transition-all duration-300 ease-in-out overflow-hidden">
      <div className="font-medium mb-4">
        2. Add a payment and complete reservation
      </div>

      {clientSecret && isVisible && isLoggedIn && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
      {!clientSecret && <p>Loading</p>}
    </div>
  );
};

export default SummaryPaymentDetails;
