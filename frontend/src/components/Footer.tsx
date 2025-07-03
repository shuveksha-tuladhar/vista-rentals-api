import React from "react";
import { FaGlobe } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          © {new Date().getFullYear()} Vista Rentals, by Shuveksha Tuladhar
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="flex items-center space-x-1">
            <FaGlobe className="h-4 w-4" />
            <span>English (US)</span>
          </a>
          <span>$ USD</span>
          <a href="#" className="underline">
            GitHub
          </a>
           <a href="#" className="underline">
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
