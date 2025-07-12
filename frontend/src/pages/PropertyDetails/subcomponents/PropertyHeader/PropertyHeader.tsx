// import React from "react";
import { FaStar } from "react-icons/fa6";
import { capitalize } from "../../../../utils/capitalize";

interface PropertyHeaderProps {
  propertyType: string;
  location: string;
  rating: number;
  guests: number;
  beds: number;
  baths: number;
  reviewsCount?: number;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  propertyType,
  location,
  rating,
  guests,
  beds,
  baths,
  reviewsCount,
}) => {
  return (
    <div className="border-b border-gray-300 pb-4">
      <h1 className="text-2xl font-semibold text-gray-900">{`Entire ${capitalize(
        propertyType
      )} in ${location}`}</h1>
      <div className="flex items-center text-sm text-gray-600 mt-1">
        <div className="text-sm text-gray-600">
          {guests} guest{guests > 1 ? "s" : ""} · {beds} bed
          {beds > 1 ? "s" : ""} · {baths} bath{baths > 1 ? "s" : ""}
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-600 font-bold mt-1">
        <FaStar className="text-yellow-500 mr-1" />
        <span>{rating.toFixed(2)}</span>
        {!!reviewsCount && reviewsCount > 0 && (
          <>
            <span className="mx-2">·</span>
            <span>{`${reviewsCount} reviews`}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyHeader;
