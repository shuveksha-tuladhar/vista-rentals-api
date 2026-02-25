import React from "react";
import { FaHome, FaBuilding, FaHotel } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";

interface PropertyTypeStepProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const propertyTypes = [
  { id: "house", name: "House", icon: FaHome, description: "A standalone home" },
  { id: "apartment", name: "Apartment", icon: FaBuilding, description: "A unit in a building" },
  { id: "villa", name: "Villa", icon: FaHouseChimney, description: "A luxurious property" },
  { id: "condo", name: "Condo", icon: FaHotel, description: "A condominium unit" },
];

const PropertyTypeStep: React.FC<PropertyTypeStepProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-2">
        Which of these best describes your place?
      </h2>
      <p className="text-gray-600 mb-8">Pick the category that fits your property</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {propertyTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => onSelectType(type.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 text-left hover:border-gray-900 ${
                selectedType === type.id
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-300 bg-white"
              }`}
            >
              <Icon className="text-3xl mb-3 text-gray-900" />
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                {type.name}
              </h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyTypeStep;
