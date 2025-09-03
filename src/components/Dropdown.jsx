import React, { useState, useRef, useEffect } from "react";

function Dropdown({ options, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-fit" ref={dropdownRef}>
      <button
        className="w-24 flex justify-between items-center px-3 py-1 bg-bg-light text-sm text-text-muted border border-border-muted rounded-full shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-bg-light"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`absolute mt-1 w-full transform transition-all duration-200 origin-top z-10 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="bg-bg border border-border rounded-lg shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-bg hover:text-text border-b border-border-muted cursor-pointer text-sm text-text-muted transition-colors ${
                index === 0 ? "rounded-t-lg" : ""
              } ${index === options.length - 1 ? "rounded-b-lg" : ""}`}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
