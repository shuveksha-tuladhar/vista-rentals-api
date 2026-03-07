import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

export interface TypeaheadOption {
  label: string;
  value: string;
}

interface TypeaheadSelectProps {
  options: TypeaheadOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function TypeaheadSelect({
  options,
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
}: TypeaheadSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value) ?? null;

  const filtered = query.trim()
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(option: TypeaheadOption) {
    onChange(option.value);
    setQuery("");
    setOpen(false);
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange("");
    setQuery("");
    setOpen(false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setOpen(true);
  }

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`flex items-center border border-gray-300 px-3 py-1.5 text-sm min-w-48 ${
          disabled ? "opacity-40 cursor-not-allowed" : "cursor-text"
        }`}
        onClick={() => !disabled && setOpen(true)}
      >
        {open ? (
          <input
            autoFocus
            value={query}
            onChange={handleInputChange}
            placeholder={selected ? selected.label : placeholder}
            className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400 text-sm"
          />
        ) : (
          <span className={`flex-1 truncate ${selected ? "text-gray-800" : "text-gray-400"}`}>
            {selected ? selected.label : placeholder}
          </span>
        )}
        {selected && !open ? (
          <button type="button" onClick={handleClear} className="ml-2 text-gray-400 hover:text-gray-600">
            <FiX className="w-3.5 h-3.5" />
          </button>
        ) : (
          <FiChevronDown className="ml-2 w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        )}
      </div>

      {open && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-0.5 bg-white border border-gray-200 max-h-56 overflow-y-auto">
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-400">No results</li>
          ) : (
            filtered.map((option) => (
              <li
                key={option.value}
                onMouseDown={() => handleSelect(option)}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
                  option.value === value ? "font-medium text-black" : "text-gray-700"
                }`}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
