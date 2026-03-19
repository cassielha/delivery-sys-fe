import React, { useState, useEffect, useRef } from "react";
import useDeliveryStore from "../store/useDeliveryStore";
import { BASE_URL } from "../../constants/global-variable";

const SearchBar = () => {
  const { setSearchQuery, setCurrentPage, searchQuery } = useDeliveryStore();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestionRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeItem = listRef.current.children[activeIndex];
      if (activeItem) {
        activeItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (inputValue.trim().length === 0 || inputValue === searchQuery) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`${BASE_URL}/suggestions?name=${inputValue}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
          setShowSuggestions(true);
          setActiveIndex(-1);
        }
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleSearch = (query) => {
    const finalQuery = typeof query === "string" ? query : inputValue;
    setSearchQuery(finalQuery);
    setCurrentPage(1);
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        const selected = suggestions[activeIndex];
        setInputValue(selected);
        handleSearch(selected);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-2 relative w-full sm:w-fit" ref={suggestionRef}>
      <div className="relative group w-full sm:w-80">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by organization name..."
          className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-2.5 pr-12 rounded-xl w-full font-semibold shadow-lg shadow-blue-500/10 border border-gray-100 dark:border-gray-700 transition-all focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {inputValue.trim().length > 0 && (
          <button
            onClick={() => {
              setInputValue("");
              handleSearch("");
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {showSuggestions && suggestions.length > 0 && (
          <ul
            ref={listRef}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-2xl max-h-60 overflow-y-auto py-2 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setInputValue(suggestion);
                  handleSearch(suggestion);
                }}
                className={`px-6 py-2.5 cursor-pointer text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-3 ${activeIndex === index ? "bg-blue-100 dark:bg-blue-900/50" : "hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  }`}
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => handleSearch()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
