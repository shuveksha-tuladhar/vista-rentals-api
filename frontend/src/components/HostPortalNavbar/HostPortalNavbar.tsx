import React from "react";
import { FaAirbnb } from "react-icons/fa6";
import { useNavigate, useLocation, Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Listings", path: "/host/listings" },
  { label: "Bookings", path: "/host/bookings" },
];

const HostPortalNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <FaAirbnb className="h-8 w-8 text-black rotate-180" />
            <span className="text-black text-xl font-bold">Vista Rentals</span>
          </button>
        </div>

        <nav className="flex items-center space-x-6">
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm ${pathname === path ? "font-semibold text-gray-900" : "text-gray-500"}`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold text-gray-700 px-4 py-2 rounded-lg border border-gray-300"
          >
            Exit
          </button>
        </nav>
      </div>
    </header>
  );
};

export default HostPortalNavbar;
