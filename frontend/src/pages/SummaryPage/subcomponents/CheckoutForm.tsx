import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/complete?payment_intent_client_secret={PAYMENT_INTENT_CLIENT_SECRET}`,
      },
    });

    if (error) {
      setError(error.message ?? "Payment failed");
      setLoading(false);
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
