import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useBookingStore } from "../../store/bookingStore";
import SearchLocation from "./SearchLocation/SearchLocation";
import NumberOfGuests from "./NumberOfGuests/NumberOfGuests";
import DatepickerContainer from "./DatepickerContainer/DatepickerContainer";

const ExpandedSearchBar: React.FC = () => {
  const { setLocation } = useBookingStore();

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto py-3 px-6 rounded-full shadow-lg bg-white border border-gray-200
      transition-all duration-300 ease-in-out"
    >
      <div className="flex flex-col flex-1 px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200 w-full md:w-auto">
        <SearchLocation onSelect={(location) => setLocation(location)} />
      </div>

      <div className="hidden md:block w-px h-8 bg-gray-300 mx-2" />
      <div className="flex flex-col flex-1 px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200 w-full md:w-auto">
        <DatepickerContainer />
      </div>

      <div className="hidden md:block w-px h-8 bg-gray-300 mx-2" />

      <div className="flex items-center flex-1 w-full md:w-auto">
        <NumberOfGuests />
        <button className="relative w-12 h-12 bg-[#FF385C] rounded-full flex items-center justify-center">
          <FaMagnifyingGlass className="absolute w-[20.57px] h-[20.57px] text-white" />
        </button>
      </div>
    </div>
  );
};

export default ExpandedSearchBar;
