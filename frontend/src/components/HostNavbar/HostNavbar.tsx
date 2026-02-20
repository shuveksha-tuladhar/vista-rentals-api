import React from "react";
import { FaAirbnb } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const HostNavbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <FaAirbnb className="h-8 w-8 text-black-500 rotate-180" />
            <span className="text-black-500 text-xl font-bold">
              Vista Rentals
            </span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold text-gray-700 px-4 py-2 rounded-full border border-gray-300"
          >
            Exit
          </button>
        </div>
      </div>
    </header>
  );
};

export default HostNavbar;
