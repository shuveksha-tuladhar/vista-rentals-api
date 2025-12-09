import React from "react";

interface ChevronRightIconProps {
  className?: string;
}

const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({ className = "h-5 w-5" }) => {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path
        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default ChevronRightIcon;
