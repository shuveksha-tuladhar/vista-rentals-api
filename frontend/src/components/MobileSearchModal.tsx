import React from "react";
import { FaXmark, FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/bookingStore";
import SearchLocation from "./SearchBar/SearchLocation/SearchLocation";
import DatepickerContainer from "./SearchBar/DatepickerContainer/DatepickerContainer";
import NumberOfGuests from "./SearchBar/NumberOfGuests/NumberOfGuests";

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSearchModal: React.FC<MobileSearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { location, checkIn, checkOut, guests, setLocation } = useBookingStore();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) {
      params.append("city", location.city);
      params.append("state", location.state);
    }
    if (checkIn) params.append("checkIn", checkIn.toISOString().split("T")[0]);
    if (checkOut) params.append("checkOut", checkOut.toISOString().split("T")[0]);
    if (guests) params.append("guests", guests.toString());
    navigate(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col md:hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">Search</span>
        <button onClick={onClose} aria-label="Close search">
          <FaXmark className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">
        <SearchLocation onSelect={(loc) => setLocation(loc)} />
        <DatepickerContainer />
        <NumberOfGuests />
      </div>

      <div className="px-4 py-4 border-t border-gray-200">
        <button
          onClick={handleSearch}
          className="w-full bg-[#FF385C] text-white py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
        >
          <FaMagnifyingGlass className="h-4 w-4" />
          Search
        </button>
      </div>
    </div>
  );
};

export default MobileSearchModal;
