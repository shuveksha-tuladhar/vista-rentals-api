import React from "react";
import { format } from "date-fns";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useBookingStore } from "../store/bookingStore";

interface SearchBarProps {
  onClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClick }) => {
  const { location, checkIn, checkOut, guests } = useBookingStore();

  const locationLabel = location
    ? `${location.city}, ${location.state}`
    : "Anywhere";
  const datesLabel =
    checkIn && checkOut
      ? `${format(checkIn, "MMM d")}–${format(checkOut, "MMM d")}`
      : "Any week";
  const guestsLabel =
    guests > 0 ? `${guests} guest${guests !== 1 ? "s" : ""}` : "Add guests";

  return (
    <div
      className="flex items-center justify-between px-2 py-2 w-full max-w-[423px] h-[48px] border border-gray-200 rounded-full shadow-lg bg-white"
      onClick={onClick}
    >
      <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-l-full truncate">
        {locationLabel}
      </button>

      <div className="w-px h-6 bg-gray-300 flex-shrink-0" />

      <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 truncate">
        {datesLabel}
      </button>

      <div className="w-px h-6 bg-gray-300 flex-shrink-0" />

      <button className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-r-full flex items-center space-x-2 truncate">
        <span>{guestsLabel}</span>
      </button>
      <button
        aria-label="Search"
        className="relative w-7 h-7 flex-shrink-0 bg-[#FF385C] rounded-[24px] flex items-center justify-center"
      >
        <FaMagnifyingGlass
          className="absolute w-[12px] h-[12px] text-white"
          style={{ strokeWidth: 1.6 }}
        />
      </button>
    </div>
  );
};

export default SearchBar;
