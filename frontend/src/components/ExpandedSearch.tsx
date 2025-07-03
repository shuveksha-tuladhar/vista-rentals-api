import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const ExpandedSearchBar: React.FC = () => {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto py-3 px-6 rounded-full shadow-lg bg-white border border-gray-200
      transition-all duration-300 ease-in-out"
    >
      <div className="flex flex-col flex-1 px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200 w-full md:w-auto">
        <span className="text-xs font-bold text-gray-900">Where</span>
        <input
          type="text"
          placeholder="Search destinations"
          className="text-sm text-gray-900 font-normal bg-transparent outline-none w-full"
        />
      </div>

      <div className="hidden md:block w-px h-8 bg-gray-300 mx-2" />
      <div className="flex flex-col flex-1 px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200 w-full md:w-auto">
        <span className="text-xs font-bold text-gray-900">When</span>
        <input
          type="text"
          placeholder="Any week"
          className="text-sm text-gray-900 font-normal bg-transparent outline-none w-full"
          readOnly
        />
      </div>

      <div className="hidden md:block w-px h-8 bg-gray-300 mx-2" />

      <div className="flex items-center flex-1 w-full md:w-auto">
        <div className="flex flex-col flex-1 px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200">
          <span className="text-xs font-bold text-gray-900">Who</span>
          <span className="text-sm text-gray-400 font-normal">Add guests</span>
        </div>
        <button className="relative w-12 h-12 bg-[#FF385C] rounded-full flex items-center justify-center">
          <FaMagnifyingGlass className="absolute w-[20.57px] h-[20.57px] text-white" />
        </button>
      </div>
    </div>
  );
};

export default ExpandedSearchBar;
