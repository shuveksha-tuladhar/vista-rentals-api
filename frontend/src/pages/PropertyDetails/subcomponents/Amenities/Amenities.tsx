import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface AmenitiesProps {
  amenities: string[];
}

const Amenities: React.FC<AmenitiesProps> = ({ amenities }) => {
  const [showAll, setShowAll] = useState(false);

  if (!amenities || amenities.length === 0) return null;

  const total = amenities.length;
  const displayedAmenities = showAll ? amenities : amenities.slice(0, 10);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
        {displayedAmenities.map((item, index) => (
          <li key={index} className="flex items-center">
            <FaCheck className="mr-2" />
            {item}
          </li>
        ))}
      </ul>

      {total > 10 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="py-1 px-3 rounded-md mt-2 border border-gray-300 hover:bg-gray-100 text-black transition cursor-pointer"
          aria-expanded={showAll}
        >
          {showAll ? "Show Less Amenities" : `Show All ${total} Amenities`}
        </button>
      )}
    </section>
  );
};

export default Amenities;
