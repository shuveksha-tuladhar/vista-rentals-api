import React from "react";

interface ChevronLeftIconProps {
  className?: string;
}

const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = ({ className = "h-5 w-5" }) => {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path
        d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default ChevronLeftIcon;
