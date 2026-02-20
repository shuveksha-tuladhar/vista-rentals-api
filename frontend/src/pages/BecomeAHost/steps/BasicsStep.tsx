import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface BasicsStepProps {
  formData: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  onFormChange: (field: string, value: number) => void;
}

const BasicsStep: React.FC<BasicsStepProps> = ({ formData, onFormChange }) => {
  const handleIncrement = (field: string) => {
    onFormChange(field, formData[field as keyof typeof formData] + 1);
  };

  const handleDecrement = (field: string) => {
    const currentValue = formData[field as keyof typeof formData];
    if (currentValue > 1) {
      onFormChange(field, currentValue - 1);
    }
  };

  const basics = [
    { field: "guests", label: "Guests", min: 1 },
    { field: "bedrooms", label: "Bedrooms", min: 1 },
    { field: "beds", label: "Beds", min: 1 },
    { field: "bathrooms", label: "Bathrooms", min: 1 },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-2">
        Share some basics about your place
      </h2>
      <p className="text-gray-600 mb-8">
        You'll add more details later, like bed types
      </p>

      <div className="space-y-6">
        {basics.map(({ field, label, min }) => (
          <div
            key={field}
            className="flex items-center justify-between py-6 border-b border-gray-200"
          >
            <span className="text-lg font-medium text-gray-900">{label}</span>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleDecrement(field)}
                disabled={formData[field as keyof typeof formData] <= min}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                  formData[field as keyof typeof formData] <= min
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-400 text-gray-700 hover:border-gray-900 cursor-pointer"
                }`}
              >
                <FaMinus className="text-sm" />
              </button>
              <span className="text-lg font-medium text-gray-900 w-8 text-center">
                {formData[field as keyof typeof formData]}
              </span>
              <button
                onClick={() => handleIncrement(field)}
                className="w-10 h-10 rounded-full border-2 border-gray-400 text-gray-700 hover:border-gray-900 flex items-center justify-center transition-all cursor-pointer"
              >
                <FaPlus className="text-sm" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicsStep;
