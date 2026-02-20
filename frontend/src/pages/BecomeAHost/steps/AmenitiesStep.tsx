import React from "react";
import {
  FaWifi,
  FaTv,
  FaKitchenSet,
  FaSnowflake,
  FaFire,
  FaShower,
  FaUtensils,
  FaKey,
  FaCar,
  FaDumbbell,
  FaElevator,
  FaWheelchair,
  FaPaw,
  FaWind,
  FaBed,
  FaCouch,
  FaComputer,
  FaCamera,
  FaWater,
} from "react-icons/fa6";
import {
  FaSwimmingPool,
  FaFirstAid,
  FaFireExtinguisher,
  FaSoap,
  FaTshirt as FaShirt,
  FaParking,
} from "react-icons/fa";

interface AmenitiesStepProps {
  selectedAmenities: string[];
  onToggleAmenity: (amenity: string) => void;
}

const amenitiesList = [
  { id: "Wi-Fi", name: "Wi-Fi", icon: FaWifi },
  { id: "TV", name: "TV", icon: FaTv },
  { id: "Air conditioning", name: "Air conditioning", icon: FaSnowflake },
  { id: "Heating", name: "Heating", icon: FaFire },
  { id: "Washer", name: "Washer", icon: FaShirt },
  { id: "Dryer", name: "Dryer", icon: FaWind },
  { id: "Kitchen", name: "Kitchen", icon: FaKitchenSet },
  { id: "Refrigerator", name: "Refrigerator", icon: FaUtensils },
  { id: "Microwave", name: "Microwave", icon: FaKitchenSet },
  { id: "Dishwasher", name: "Dishwasher", icon: FaUtensils },
  { id: "Coffee maker", name: "Coffee maker", icon: FaUtensils },
  { id: "Hot water", name: "Hot water", icon: FaWater },
  { id: "Iron", name: "Iron", icon: FaShirt },
  { id: "Hair dryer", name: "Hair dryer", icon: FaWind },
  { id: "Hangers", name: "Hangers", icon: FaShirt },
  { id: "Bed linens", name: "Bed linens", icon: FaBed },
  {
    id: "Extra pillows and blankets",
    name: "Extra pillows and blankets",
    icon: FaBed,
  },
  { id: "Shampoo", name: "Shampoo", icon: FaSoap },
  { id: "Conditioner", name: "Conditioner", icon: FaSoap },
  { id: "Body soap", name: "Body soap", icon: FaSoap },
  { id: "Toilet paper", name: "Toilet paper", icon: FaShower },
  { id: "Towels", name: "Towels", icon: FaShower },
  { id: "Bathtub", name: "Bathtub", icon: FaShower },
  { id: "Private bathroom", name: "Private bathroom", icon: FaShower },
  { id: "Smart TV", name: "Smart TV", icon: FaTv },
  { id: "Patio or balcony", name: "Patio or balcony", icon: FaCouch },
  { id: "BBQ grill", name: "BBQ grill", icon: FaUtensils },
  { id: "Fire pit", name: "Fire pit", icon: FaFire },
  {
    id: "Free parking on premises",
    name: "Free parking on premises",
    icon: FaCar,
  },
  {
    id: "Paid parking on premises",
    name: "Paid parking on premises",
    icon: FaParking,
  },
  { id: "EV charger", name: "EV charger", icon: FaCar },
  { id: "Pool", name: "Pool", icon: FaSwimmingPool },
  { id: "Hot tub", name: "Hot tub", icon: FaSwimmingPool },
  { id: "Gym", name: "Gym", icon: FaDumbbell },
  { id: "Elevator", name: "Elevator", icon: FaElevator },
  { id: "Smoke alarm", name: "Smoke alarm", icon: FaFireExtinguisher },
  {
    id: "Carbon monoxide alarm",
    name: "Carbon monoxide alarm",
    icon: FaFireExtinguisher,
  },
  { id: "First aid kit", name: "First aid kit", icon: FaFirstAid },
  {
    id: "Fire extinguisher",
    name: "Fire extinguisher",
    icon: FaFireExtinguisher,
  },
  {
    id: "Security cameras on property",
    name: "Security cameras on property",
    icon: FaCamera,
  },
  { id: "Dedicated workspace", name: "Dedicated workspace", icon: FaComputer },
  { id: "High-speed Wi-Fi", name: "High-speed Wi-Fi", icon: FaWifi },
  {
    id: "Wheelchair accessible",
    name: "Wheelchair accessible",
    icon: FaWheelchair,
  },
  { id: "Pets allowed", name: "Pets allowed", icon: FaPaw },
  { id: "Self check-in", name: "Self check-in", icon: FaKey },
];

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
        {amenitiesList.map((amenity) => {
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
