import React from "react";
import { BsStars } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa6";

interface PriceSuggestion {
  min: number;
  max: number;
  reasoning: string;
}

interface PricingStepProps {
  price: number;
  onPriceChange: (price: number) => void;
  onSuggestPrice: () => void;
  isSuggestingPrice: boolean;
  hasRequestedSuggestion: boolean;
  priceSuggestion: PriceSuggestion | null;
}

const PricingStep: React.FC<PricingStepProps> = ({
  price,
  onPriceChange,
  onSuggestPrice,
  isSuggestingPrice,
  hasRequestedSuggestion,
  priceSuggestion,
}) => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onPriceChange(value);
  };

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
        <div className="border border-gray-200 rounded-xl p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BsStars className="text-amber-500 text-sm" />
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  AI pricing help
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                Get a suggested nightly price range
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Use AI to estimate pricing from similar listings based on your property details.
              </p>
            </div>

            <button
              type="button"
              onClick={onSuggestPrice}
              disabled={isSuggestingPrice}
              className="shrink-0 px-4 py-2 text-sm font-medium bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSuggestingPrice ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  Suggesting...
                </>
              ) : (
                <>
                  <BsStars className="w-4 h-4 text-amber-500" />
                  Suggest price using AI
                </>
              )}
            </button>
          </div>
        </div>

        {hasRequestedSuggestion && priceSuggestion && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-transparent">
            <div className="flex items-center gap-1.5 mb-4">
              <BsStars className="text-amber-500 text-sm" />
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                AI price suggestion
              </p>
            </div>
            <p className="text-lg font-bold text-gray-900 mb-2">
              ${priceSuggestion.min} – ${priceSuggestion.max} / night
            </p>
            <div className="flex gap-3">
              <span className="text-5xl leading-none text-amber-500 select-none mt-1">&ldquo;</span>
              <p className="text-sm text-gray-600 leading-relaxed">{priceSuggestion.reasoning}</p>
            </div>
          </div>
        )}
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
