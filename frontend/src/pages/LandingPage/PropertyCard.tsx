import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import type { PropertyImages } from "../PropertyDetails/subcomponents/Gallery/types/PropertyImagesType";

interface PropertyCardProps {
  property_type: string;
  property_images: PropertyImages[];
  city: string;
  rating: string;
  price: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property_type,
  property_images,
  city,
  rating,
  price,
}) => {
  return (
    <div className="w-full max-w-[313px] mx-auto flex flex-col cursor-pointer pb-4">
      <div className="relative w-full aspect-[1/1] rounded-xl overflow-hidden mb-3">
        <img
          src={property_images[0]?.url}
          alt={city}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/600x400/cccccc/333333?text=Image+Error";
          }}
        />
        <button
          aria-label="Save to favorites"
          className="absolute top-3 right-3 w-8 h-8 z-[1] flex items-center justify-center bg-black/50 border-2 border-white rounded-full"
        >
          <FaHeart className="w-4 h-4 text-white" />
        </button>
      </div>
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-semibold text-gray-900 text-base">{`${property_type} in ${city}`}</h3>
      </div>
      <p className="font-semibold text-gray-900 text-sm mt-1 flex items-center">
        {`$${price}`} <span className="font-normal ml-1">per night</span>
        <span className="mx-2">&middot;</span>
        <FaStar className="text-gray-900 mx-1" />
        <span>{rating}</span>
      </p>
    </div>
  );
};

export default PropertyCard;
