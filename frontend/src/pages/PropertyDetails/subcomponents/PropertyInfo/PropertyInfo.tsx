import React, { useState } from "react";

interface PropertyInfoProps {
  description: string;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 500;

  const isLong = description.length > maxLength;

  const displayedText = isExpanded || !isLong 
    ? description 
    : description.slice(0, maxLength) + "...";

  return (
    <section className="border-b border-gray-300 pb-6">
      {/* <h2 className="text-xl font-semibold mb-2">About this place</h2> */}
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{displayedText}</p>

      {isLong && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="py-1 px-3 rounded-md mt-2 border border-gray-100 bg-gray-100 text-black cursor-pointer"
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </section>
  );
};

export default PropertyInfo;
