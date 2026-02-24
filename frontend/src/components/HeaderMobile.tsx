import React, { useState } from "react";
import { format } from "date-fns";
import { FaAirbnb, FaBars, FaCircleUser } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useBookingStore } from "../store/bookingStore";
import { AuthModal } from "./Auth/AuthModal";
import MobileSearchModal from "./MobileSearchModal";
import MobileMenu from "./MobileMenu";

const HeaderMobile: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoggedIn, isModalOpen, setIsModalOpen } = useAuthStore();
  const { location, checkIn, checkOut, guests } = useBookingStore();
  const routerLocation = useLocation();
  const navigate = useNavigate();

  const hideSearchPill = routerLocation.pathname === "/review";

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
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 pb-3 pt-2 md:hidden">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/")} aria-label="Go to home" className="cursor-pointer">
            <FaAirbnb className="h-7 w-7 text-red-500 rotate-180 flex-shrink-0" />
          </button>

          {!hideSearchPill && (
            <div className="flex-1 mx-3">
              <div
                className="w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm flex items-center justify-center bg-white cursor-pointer"
                role="button"
                onClick={() => setIsSearchOpen(true)}
              >
                <div className="flex flex-col items-center justify-center">
                  <span className="text-sm font-medium text-gray-900">
                    {locationLabel}
                  </span>
                  <span className="text-xs text-gray-500">
                    {datesLabel} · {guestsLabel}
                  </span>
                </div>
              </div>
            </div>
          )}

          <button
            className="flex items-center space-x-2 border border-gray-200 rounded-full p-2 shadow-sm cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            {isLoggedIn ? (
              <FaCircleUser className="h-7 w-7 text-blue-600 rounded-full p-1" />
            ) : (
              <>
                <FaBars className="h-5 w-5 text-gray-700" />
                <FaCircleUser className="h-7 w-7 text-gray-700 rounded-full p-1" />
              </>
            )}
          </button>
        </div>
      </header>

      <MobileSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default HeaderMobile;
