import { useAuthStore } from "../../../store/authStore";

interface Props {
  isVisible: boolean;
}

const SummaryPaymentDetails = ({ isVisible }: Props) => {
  const { isLoggedIn } = useAuthStore();

  return (
    <div className="bg-white border rounded-2xl p-6 border-gray-300 shadow-sm transition-all duration-300 ease-in-out overflow-hidden">
      <div className="font-medium mb-4">
        2. Add a payment and complete reservation
      </div>

      {isVisible && isLoggedIn && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="inline-flex items-center gap-1">
              💳 Credit or debit card
            </span>
            <img src="https://img.icons8.com/color/24/visa.png" alt="Visa" />
            <img
              src="https://img.icons8.com/color/24/mastercard-logo.png"
              alt="Mastercard"
            />
            <img src="https://img.icons8.com/color/24/amex.png" alt="Amex" />
            <img
              src="https://img.icons8.com/color/24/discover.png"
              alt="Discover"
            />
          </div>

          <div className="relative">
            <label className="text-sm block mb-1">Cardholder's name</label>
            <input
              type="text"
              placeholder="Full name"
              className="w-full border border-gray-300 rounded-lg p-3 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
            />
          </div>

          <div className="relative">
            <label className="text-sm block mb-1">Card number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full border border-gray-300 rounded-lg p-3 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/3">
              <label className="text-sm block mb-1">Expiration</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
              />
            </div>
            <div className="w-1/3">
              <label className="text-sm block mb-1">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
              />
            </div>
            <div className="w-1/3">
              <label className="text-sm block mb-1">ZIP code</label>
              <input
                type="text"
                placeholder="12345"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
              />
            </div>
          </div>

          <div className="text-sm text-gray-600">
            By clicking "Confirm and Pay", I agree to the charges and terms of
            service.
          </div>

          <div className="flex justify-end">
            <button className="bg-[#FF385C] text-white px-4 py-2 rounded-lg disabled:opacity-50">
              Confirm and Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryPaymentDetails;
