import React from "react";
import { FaRegStar } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

interface PropertyCardProps {
  image: string;
  location: string;
  rating: number;
  distance: string;
  date: string;
  price: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  location,
  rating,
  distance,
  date,
  price,
}) => {
  return (
    <div className="w-[313px] flex flex-col cursor-pointer pb-4">
      <div className="relative w-full h-80 rounded-xl overflow-hidden mb-3">
        <img
          src={image}
          alt={location}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/600x400/cccccc/333333?text=Image+Error`;
          }}
        />
        <button
          aria-label="Save to favorites"
          className="absolute left-[265px] top-[12.57px] w-8 h-8 z-[1] flex items-center justify-center bg-black/50 border-2 border-white rounded-full"
        >
          <FaHeart className="w-[16px] h-[16px] text-white" />
        </button>
      </div>
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-semibold text-gray-900 text-base">{location}</h3>
        <div className="flex items-center space-x-1 text-sm text-gray-700">
          <FaRegStar className="text-gray-900" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
      <p className="text-gray-500 text-sm">{distance}</p>
      <p className="text-gray-500 text-sm">{date}</p>
      <p className="font-semibold text-gray-900 text-sm mt-1">
        {price} <span className="font-normal">night</span>
      </p>
    </div>
  );
};

export default PropertyCard;
