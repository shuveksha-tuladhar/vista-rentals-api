import React from "react";
import { AMENITIES_LIST } from "../../../utils/amenities";

interface AmenitiesStepProps {
  selectedAmenities: string[];
  onToggleAmenity: (amenity: string) => void;
}

const AmenitiesStep: React.FC<AmenitiesStepProps> = ({
  selectedAmenities,
  onToggleAmenity,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-2">
        Tell guests what your place has to offer
      </h2>
      <p className="text-gray-600 mb-8">
        You can add more amenities after you publish your listing
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
        {AMENITIES_LIST.map((amenity) => {
          const Icon = amenity.icon;
          const isSelected = selectedAmenities.includes(amenity.id);
          return (
            <button
              key={amenity.id}
              onClick={() => onToggleAmenity(amenity.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:border-gray-500 ${
                isSelected
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-300 bg-white"
              }`}
            >
              <Icon className="text-xl mb-2 text-gray-900" />
              <h3 className="font-medium text-sm text-gray-900">
                {amenity.name}
              </h3>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AmenitiesStep;
