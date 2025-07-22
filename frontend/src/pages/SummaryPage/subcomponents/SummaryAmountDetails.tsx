import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";

interface SummaryAmountDetailsProps {
  total: number;
  onConfirm: () => void;
}

const SummaryAmountDetails = ({
  total,
  onConfirm,
}: SummaryAmountDetailsProps) => {
  const { isLoggedIn, setIsModalOpen } = useAuthStore();
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = () => {
    setSelectedOption("pay_now");
  };

  return (
    <div className="bg-white border border-gray-300 shadow-sm rounded-2xl p-6 space-y-4">
      {isLoggedIn ? (
        <>
          <h2 className="text-lg font-semibold">Confirm</h2>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 font-medium cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="pay_now"
                checked={selectedOption === "pay_now"}
                onChange={handleSelect}
                className="w-5 h-5 text-[#FF385C] accent-[#FF385C]"
              />
              Pay ${total.toFixed(2)} now
            </label>
            <button
              className="bg-[#FF385C] text-white px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
              disabled={selectedOption !== "pay_now"}
              onClick={onConfirm}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between">
          <div className="font-medium">1. Log in or sign up</div>
          <button
            className="bg-[#FF385C] text-white px-4 py-2 rounded-lg cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default SummaryAmountDetails;
