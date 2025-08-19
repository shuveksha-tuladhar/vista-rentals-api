import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { FaMagnifyingGlass } from "react-icons/fa6";
import DatePickerModal from "./DatepickerModal/DatepickerModal";
import { useBookingStore } from "../store/bookingStore";
import { format } from "date-fns";

const ExpandedSearchBar: React.FC = () => {
  const [isOpenDatepicker, setIsOpenDatepicker] = useState(false);
  const { checkIn, checkOut } = useBookingStore();

  const location = useLocation();

  useEffect(() => {
    setIsOpenDatepicker(false);
  }, [location.pathname]);

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
        <div className="relative">
          <input
            type="text"
            placeholder="Any week"
            className="text-sm text-gray-900 font-normal bg-transparent outline-none w-full"
            {...(checkIn && checkOut
              ? {
                  value: `${format(checkIn, "MMM d, yyyy")} - ${format(
                    checkOut,
                    "MMM d, yyyy"
                  )}`,
                }
              : {})}
            onClick={() => setIsOpenDatepicker(true)}
            readOnly
          />
          <DatePickerModal
            isOpen={isOpenDatepicker}
            onClose={() => setIsOpenDatepicker(false)}
            wrapperClassName="absolute top-full left-0 z-50"
            popupPositionClassName="bg-white rounded-xl shadow-md p-4 w-[700px]"
          />
        </div>
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
