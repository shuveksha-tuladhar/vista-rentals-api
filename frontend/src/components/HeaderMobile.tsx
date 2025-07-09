import React from "react";
import { FaAirbnb, FaBars, FaCircleUser } from "react-icons/fa6";

const HeaderMobile: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 pb-3 pt-2 md:hidden">
      <div className="flex items-center justify-between">
        <FaAirbnb className="h-7 w-7 text-red-500 rotate-180" />
        <div className="flex-1 mx-3">
          <div
            className="w-full px-3 py-2 border border-gray-300 rounded-full shadow flex items-center justify-center bg-white"
            role="button"
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm font-medium text-gray-900">
                Homes in Las Vegas
              </span>
              <span className="text-xs text-gray-500">
                Jul 11–12 · 2 guests
              </span>
            </div>
          </div>
        </div>
        <button className="flex items-center space-x-2 border border-gray-200 rounded-full p-2 shadow-sm hover:shadow-md transition-all duration-200">
          <FaBars className="h-5 w-5 text-gray-700" />
          <FaCircleUser className="h-7 w-7 text-gray-700 rounded-full p-1" />
        </button>
      </div>
    </header>
  );
};

export default HeaderMobile;
