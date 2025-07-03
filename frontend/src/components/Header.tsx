import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './SearchBar'; // Import the minified search bar
import ExpandedSearchBar from './ExpandedSearch'; // Import the expanded search bar
import { FaAirbnb, FaBars, FaCircleUser, FaGlobe } from 'react-icons/fa6';

const Header: React.FC = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(true);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 0) {
      setIsSearchExpanded(false);
    } else {
      setIsSearchExpanded(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
  };

  return (
    <header className={`sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 transition-all duration-300 ease-in-out ${isSearchExpanded ? 'py-4' : 'py-2'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex-shrink-0">
          <a href="#" className="flex items-center space-x-2">
            <FaAirbnb className="h-8 w-8 text-red-500 rotate-180" />
            <span className="hidden md:block text-red-500 text-xl font-bold">Vista Rentals</span>
          </a>
        </div>

        {isSearchExpanded && (
          <nav className="hidden md:flex justify-center flex-grow">
            <ul className="flex space-x-8">
              <li>
                <a href="#" className="text-gray-400 py-2 border-b-2 border-black">Stays</a>
              </li>
            </ul>
          </nav>
        )}
        
        {!isSearchExpanded && (
          <div className="flex-grow flex justify-center">
            <SearchBar onClick={handleSearchClick} />
          </div>
        )}

        <div className="flex items-center space-x-4">
          <a href="#" className="hidden lg:block text-sm font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors duration-200">
            Become a Host
          </a>
          <button className="hidden sm:block p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <FaGlobe className="h-5 w-5 text-gray-700" />
          </button>
          <button className="flex items-center space-x-2 border border-gray-200 rounded-full p-2 shadow-sm hover:shadow-md transition-all duration-200">
            <FaBars className="h-5 w-5 text-gray-700"/>
            <FaCircleUser className="h-7 w-7 text-gray-700 rounded-full p-1"/>
          </button>
        </div>
      </div>

      {isSearchExpanded && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex justify-center">
          <ExpandedSearchBar  />
        </div>
      )}
    </header>
  );
};

export default Header;
