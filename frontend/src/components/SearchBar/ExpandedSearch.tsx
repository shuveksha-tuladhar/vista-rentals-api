import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../../store/bookingStore";
import SearchLocation from "./SearchLocation/SearchLocation";
import NumberOfGuests from "./NumberOfGuests/NumberOfGuests";
import DatepickerContainer from "./DatepickerContainer/DatepickerContainer";

const ExpandedSearchBar: React.FC = () => {
  const navigate = useNavigate();
  const { setLocation, location, checkIn, checkOut, guests } = useBookingStore();

  const handleSearch = () => {
    // Build query parameters
    const params = new URLSearchParams();
    if (location) {
      params.append("city", location.city);
      params.append("state", location.state);
    }
    if (checkIn) params.append("checkIn", checkIn.toISOString().split('T')[0]);
    if (checkOut) params.append("checkOut", checkOut.toISOString().split('T')[0]);
    if (guests) params.append("guests", guests.toString());
    
    // Navigate to properties page with search params
    navigate(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
  }
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto px-6 py-1 rounded-full shadow-lg bg-white border border-gray-200"
    >
      <div className="flex flex-col flex-1 px-4 hover:bg-gray-100 rounded-full cursor-pointer w-full md:w-auto">
        <SearchLocation onSelect={(location) => setLocation(location)} />
      </div>

      <div className="hidden md:block w-px h-8 bg-gray-300 mx-2" />
      <div className="flex flex-col flex-1 px-4 hover:bg-gray-100 rounded-full cursor-pointer w-full md:w-auto">
        <DatepickerContainer
          datepickerWrapperClassName="absolute top-full left-0 z-[1000]"
          datepickerPopupClassName="bg-white rounded-xl shadow-md p-4 w-[700px]"
        />
      </div>

      <div className="hidden md:block w-px h-8 bg-gray-300 mx-2" />

      <div className="flex items-center mx-2 flex-1 w-full md:w-auto">
        <NumberOfGuests />
      </div>

      <button className="relative w-12 h-12 bg-[#FF385C] rounded-full flex items-center justify-center cursor-pointer" onClick={handleSearch}>
        <FaMagnifyingGlass className="absolute w-[20.57px] h-[20.57px] text-white" />
      </button>
    </div>
  );
};

export default ExpandedSearchBar;
