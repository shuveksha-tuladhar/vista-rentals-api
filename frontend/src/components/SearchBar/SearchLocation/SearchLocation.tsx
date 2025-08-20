import React, { useEffect, useState, useRef } from "react";
import { getApi } from "../../../utils/api";

export type LocationItem = { city: string; state: string };

interface SearchLocationProps {
  onSelect?: (loc: LocationItem | null) => void;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ onSelect }) => {
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<LocationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [, setSelected] = useState<LocationItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getApi<LocationItem[]>("/properties/location")
      .then((resp) => setLocations(resp.data as LocationItem[]))
      .catch(() => setLocations([]));
  }, []);

  useEffect(() => {
    if (query === "") {
      setFiltered(locations);
    } else {
      setFiltered(
        locations.filter((loc) =>
          `${loc.city}, ${loc.state}`.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, locations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (loc: LocationItem) => {
    setSelected(loc);
    setQuery(`${loc.city}, ${loc.state}`);
    setIsOpen(false);
    if (onSelect) onSelect(loc);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200 w-full md:w-auto"
    >
      <span className="text-xs font-bold text-gray-900">Where</span>
      <input
        type="text"
        value={query}
        placeholder="Search destinations"
        className="w-full mt-1 px-0 text-sm bg-transparent focus:outline-none"
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && filtered.length > 0 && (
        <ul className="absolute top-full left-0 z-50 w-full mt-2 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
          {filtered.map((loc, idx) => (
            <li
              key={idx}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(loc)}
            >
              {loc.city}, {loc.state}
            </li>
          ))}
        </ul>
      )}

      {isOpen && filtered.length === 0 && (
        <div className="absolute top-full left-0 z-50 w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-500">
          No results
        </div>
      )}
    </div>
  );
};

export default SearchLocation;
