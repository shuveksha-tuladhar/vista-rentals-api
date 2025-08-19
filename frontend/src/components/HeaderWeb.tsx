import React, { useState, useEffect, useCallback, useRef } from "react";
import SearchBar from "./SearchBar";
import ExpandedSearchBar from "./ExpandedSearch";
import { FaAirbnb, FaBars, FaCircleUser, FaGlobe } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";
import { AuthModal } from "./Auth/AuthModal";
import { useOutsideClick } from "./hooks/useOutsideClick";
import { useAuthStore } from "../store/authStore";
import { deleteApi } from "../utils/api";
import { useToastStore } from "../store/toastStore";
import { useBookingStore } from "../store/bookingStore";

const Header: React.FC = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { setCheckIn, setCheckOut } = useBookingStore();
  const { isLoggedIn, logout, isModalOpen, setIsModalOpen } = useAuthStore();
  const { addToast } = useToastStore();

  const debounceTimeout = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(menuRef, () => setIsMenuOpen(false));

  useEffect(() => {
    if (location.pathname === "/") {
      setCheckIn(null);
      setCheckOut(null);
    }
  }, [setCheckIn, setCheckOut, location.pathname]);

  const handleScroll = useCallback(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      if (window.scrollY > 0) {
        setIsSearchExpanded(false);
      } else {
        setIsSearchExpanded(true);
      }
    }, 200);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
  };

  const handleLogout = async () => {
    deleteApi("/logout").then((response) => {
      if (response.data) {
        logout();
        addToast({ message: "Log out successfully", type: "success" });
      }
    });
  };

  const hideSearchBarAndNav = location.pathname === "/review";

  return (
    <header
      className={`sticky top-0 z-50 hidden md:block bg-white shadow-sm border-b border-gray-200 transition-all duration-300 ease-in-out ${
        isSearchExpanded ? "py-4" : "py-2 h-[72px]"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[56px]">
        <div className="flex-shrink-0">
          <a href="#" className="flex items-center space-x-2">
            <FaAirbnb className="h-8 w-8 text-red-500 rotate-180" />
            <span
              className="hidden md:block text-red-500 text-xl font-bold"
              onClick={() => navigate("/")}
            >
              Vista Rentals
            </span>
          </a>
        </div>

        {!hideSearchBarAndNav && (
          <>
            {isSearchExpanded && (
              <nav className="hidden md:flex justify-center flex-grow">
                <ul className="flex space-x-8">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 py-2 border-b-2 border-black"
                    >
                      Stays
                    </a>
                  </li>
                </ul>
              </nav>
            )}

            {!isSearchExpanded && (
              <div className="flex-grow flex justify-center min-h-[48px]">
                <SearchBar onClick={handleSearchClick} />
              </div>
            )}

            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="hidden lg:block text-sm font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors duration-200"
              >
                Become a Host
              </a>
              <button className="hidden sm:block p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                <FaGlobe className="h-5 w-5 text-gray-700" />
              </button>
              <div className="relative">
                <button
                  className="flex items-center space-x-2 border border-gray-100 rounded-full p-2 shadow-sm hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {!isLoggedIn && <FaBars className="h-5 w-5 text-gray-700" />}
                  {isLoggedIn && (
                    <FaCircleUser className="h-7 w-7 text-gray-700 rounded-full p-1" />
                  )}
                </button>

                {isMenuOpen && (
                  <div
                    ref={menuRef}
                    className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg z-50 py-2 text-sm border border-gray-200"
                  >
                    <button className="w-full px-4 py-2 hover:bg-gray-100 text-left cursor-pointer">
                      About Us
                    </button>
                    <button className="w-full px-4 py-2 hover:bg-gray-100 text-left cursor-pointer">
                      Become a Host
                    </button>
                    {!isLoggedIn && (
                      <button
                        className="w-full px-4 hover:bg-gray-100 text-left cursor-pointer"
                        onClick={() => {
                          setIsModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                      >
                        <div className=" border-t border-gray-200 py-2 ">
                          Login or Sign Up
                        </div>
                      </button>
                    )}
                    {isLoggedIn && (
                      <button
                        className="w-full px-4 hover:bg-gray-100 text-left cursor-pointer"
                        onClick={handleLogout}
                      >
                        <div className=" border-t border-gray-200 py-2 ">
                          Log out
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {!hideSearchBarAndNav && (
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex justify-center transition-opacity duration-300 ease-in-out ${
            isSearchExpanded
              ? "opacity-100 h-auto"
              : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <ExpandedSearchBar />
        </div>
      )}

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;
