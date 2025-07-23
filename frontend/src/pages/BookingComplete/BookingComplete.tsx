import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getApi } from "../../utils/api";
interface PaymentSummary {
  status: string;
  amount_received: number;
  currency: string;
  id: string;
  payment_method_types?: string[];
}

export default function BookingComplete() {
  const [searchParams] = useSearchParams();

  const [summary, setSummary] = useState<PaymentSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paymentIntentId = searchParams.get("payment_intent");

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
        setSummary(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch payment status from backend");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentIntentStatus();
  }, [paymentIntentId]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading payment details...</div>;
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
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <div className="text-center mb-6">
        <h1 className={`text-2xl font-bold ${isSuccess ? "text-red-600" : "text-red-600"}`}>
          {isSuccess ? "Booking Confirmed" : "Payment Failed"}
        </h1>
        <p className="text-gray-600 mt-1 text-sm">Here’s your payment summary:</p>
      </div>

      <div className="space-y-3 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Payment Status:</span>{" "}
          <span className="capitalize">{summary.status}</span>
        </p>
        <p>
          <span className="font-semibold">Payment Intent ID:</span> {summary.id}
        </p>
        <p>
          <span className="font-semibold">Amount Paid:</span> $
          {(summary.amount_received / 100).toFixed(2)} {summary.currency?.toUpperCase()}
        </p>
      </div>

      <div className="mt-8 text-center">
        <a href="/" className="inline-block text-sm text-red-600 hover:underline">
          ⬅ Back to homepage
        </a>
      </div>
    </div>
  );
}
