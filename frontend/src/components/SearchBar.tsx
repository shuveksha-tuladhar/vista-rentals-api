import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps {
  onClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClick }) => {
  return (
    <div
      className="flex items-center justify-between px-2 py-2 w-[423px] min-w-[423px] h-[48px] border border-gray-200 rounded-full shadow-lg bg-white"
      onClick={onClick}
    >
      <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-l-full">
        Anywhere
      </button>

      <div className="w-px h-6 bg-gray-300" />

      <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">
        Any week
      </button>

      <div className="w-px h-6 bg-gray-300" />

      <button className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-r-full flex items-center space-x-2">
        <span>Add guests</span>
        <button
          aria-label="Search"
          className="relative w-7 h-7 bg-[#FF385C] rounded-[24px] flex items-center justify-center"
        >
          <FaMagnifyingGlass
            className="absolute w-[12px] h-[12px] text-white"
            style={{ strokeWidth: 1.6 }}
          />
        </button>
      </button>
    </div>
  );
};

export default SearchBar;
