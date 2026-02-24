import React from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useToastStore } from "../store/toastStore";
import { deleteApi } from "../utils/api";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout, setIsModalOpen } = useAuthStore();
  const { addToast } = useToastStore();

  const handleLogout = () => {
    deleteApi("/logout").then((response) => {
      if (response.data) {
        logout();
        addToast({ message: "Log out successfully", type: "success" });
      }
    });
    onClose();
  };

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col md:hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">Menu</span>
        <button onClick={onClose} aria-label="Close menu">
          <FaXmark className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <nav className="flex flex-col py-2">
        <button
          className="w-full px-4 py-3 text-left text-sm text-gray-900 hover:bg-gray-100"
          onClick={() => handleNav("/about-us")}
        >
          About Us
        </button>

        <button
          className="w-full px-4 py-3 text-left text-sm text-gray-900 hover:bg-gray-100"
          onClick={() =>
            handleNav(
              isLoggedIn && user?.is_host ? "/host/listings" : "/become-a-host"
            )
          }
        >
          {isLoggedIn && user?.is_host ? "Switch to Listing" : "Become a Host"}
        </button>

        {!isLoggedIn && (
          <button
            className="w-full px-4 py-3 text-left text-sm text-gray-900 hover:bg-gray-100 border-t border-gray-200 mt-2"
            onClick={() => {
              setIsModalOpen(true);
              onClose();
            }}
          >
            Login / Sign Up
          </button>
        )}

        {isLoggedIn && (
          <button
            className="w-full px-4 py-3 text-left text-sm text-gray-900 hover:bg-gray-100 border-t border-gray-200 mt-2"
            onClick={() => handleNav("/favorites")}
          >
            My Favorites
          </button>
        )}

        {isLoggedIn && (
          <button
            className="w-full px-4 py-3 text-left text-sm text-gray-900 hover:bg-gray-100 border-t border-gray-200"
            onClick={handleLogout}
          >
            Log out
          </button>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
