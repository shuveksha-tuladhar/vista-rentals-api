import React from "react";

interface PricingStepProps {
  price: number;
  onPriceChange: (price: number) => void;
}

const PricingStep: React.FC<PricingStepProps> = ({ price, onPriceChange }) => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onPriceChange(value);
  };

  const suggestedPrices = [100, 200, 300, 400, 500];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-2">
        Now, set your price
      </h2>
      <p className="text-gray-600 mb-8">
        You can change it anytime
      </p>

      <div className="bg-white rounded-xl border-2 border-gray-300 p-8 mb-6">
        <div className="flex items-center justify-center">
          <span className="text-5xl font-semibold text-gray-900 mr-2">$</span>
          <input
            type="number"
            value={price || ""}
            onChange={handlePriceChange}
            className="text-5xl font-semibold text-gray-900 w-48 border-b-2 border-gray-300 focus:border-gray-900 outline-none text-center"
            min="0"
            placeholder="0"
          />
        </div>
        <p className="text-center text-gray-600 mt-4">per night</p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">
          Suggested prices
        </p>
        <div className="flex flex-wrap gap-3">
          {suggestedPrices.map((suggestedPrice) => (
            <button
              key={suggestedPrice}
              onClick={() => onPriceChange(suggestedPrice)}
              className={`px-6 py-3 rounded-full border-2 transition-all cursor-pointer ${
                price === suggestedPrice
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-300 bg-white hover:border-gray-900"
              }`}
            >
              ${suggestedPrice}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-900 mb-2">Guest price breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">${price} x 1 night</span>
            <span className="text-gray-900">${price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Service fee</span>
            <span className="text-gray-900">${Math.round(price * 0.14)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-300">
            <span className="font-semibold text-gray-900">Guest total</span>
            <span className="font-semibold text-gray-900">
              ${price + Math.round(price * 0.14)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingStep;
