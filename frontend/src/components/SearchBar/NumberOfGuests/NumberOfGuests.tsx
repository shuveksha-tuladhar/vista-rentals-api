import React, { useState, useRef, useEffect } from "react";
import { useBookingStore } from "../../../store/bookingStore";

const NumberOfGuests: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { guests, setGuests } = useBookingStore();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200"
      >
        <span className="text-xs font-bold text-gray-900">Who</span>
        <span className="text-sm text-gray-400 font-normal">
          {guests > 0 ? `${guests} guest${guests > 1 ? "s" : ""}` : "Add guests"}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-xl p-4 w-64 z-50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">Adult(s)</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setGuests(Math.max(0, guests - 1))}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="text-sm font-medium w-6 text-center">{guests}</span>
              <button
                onClick={() => setGuests(guests + 1)}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberOfGuests;
