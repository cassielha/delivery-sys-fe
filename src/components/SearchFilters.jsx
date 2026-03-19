import React, { useState } from 'react';
import useDeliveryStore from '../store/useDeliveryStore';
import { getStateAndCityPicklist } from '../../constants/usStateAndCity';

const SearchFilters = () => {
  const { filters, setFilters } = useDeliveryStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [localFilters, setLocalFilters] = useState(filters);

  const locationData = getStateAndCityPicklist();
  const stateOptions = Object.keys(locationData);

  const currentActiveStateAbbr = isDrawerOpen ? localFilters.state : filters.state;
  const cityOptions = currentActiveStateAbbr ? locationData[currentActiveStateAbbr]?.cities || [] : [];

  const handleFilterChange = (key, value) => {
    if (isDrawerOpen) {
      setLocalFilters(prev => ({
        ...prev,
        [key]: value,
        ...(key === 'state' ? { city: '' } : {})
      }));
    } else {
      setFilters({
        [key]: value,
        ...(key === 'state' ? { city: '' } : {})
      });
    }
  };

  const applyMobileFilters = () => {
    setFilters(localFilters);
    setIsDrawerOpen(false);
  };

  const clearFilters = () => {
    const empty = { state: "", city: "", category: "", minRating: "", maxRating: "" };
    setLocalFilters(empty);
    setFilters(empty);
    setIsDrawerOpen(false);
  };

  const openDrawer = () => {
    setLocalFilters(filters);
    setIsDrawerOpen(true);
  };
  const categories = ["Food", "Drinks", "Groceries", "Electronics", "Clothing", "Documents"];

  const FilterInputs = ({ isMobile }) => {
    const currentFilters = isMobile ? localFilters : filters;
    return (
      <>
        <select
          value={currentFilters.state}
          onChange={(e) => handleFilterChange('state', e.target.value)}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto font-medium"
        >
          <option value="">All States</option>
          {stateOptions.map(stateAbbr => (
            <option key={stateAbbr} value={stateAbbr}>
              {locationData[stateAbbr].fullName}
            </option>
          ))}
        </select>

        <select
          value={currentFilters.city}
          onChange={(e) => handleFilterChange('city', e.target.value)}
          disabled={!currentFilters.state}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-900 w-full md:w-auto font-medium"
        >
          <option value="">All Cities</option>
          {cityOptions.map(city => <option key={city} value={city}>{city}</option>)}
        </select>

        <select
          value={currentFilters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto font-medium"
        >
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-24">
            <input
              type="number"
              placeholder="Min ⭐"
              min="0" max="5" step="0.5"
              value={currentFilters.minRating}
              onChange={(e) => handleFilterChange('minRating', e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
          <span className="text-gray-400 font-bold">-</span>
          <div className="relative flex-1 md:w-24">
            <input
              type="number"
              placeholder="Max ⭐"
              min="0" max="5" step="1"
              value={currentFilters.maxRating}
              onChange={(e) => handleFilterChange('maxRating', e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
        </div>
      </>
    );
  };

  const activeFiltersCount = Object.values(filters).filter(v => typeof v === 'string' && v.trim() !== "").length;

  return (
    <>
      {/* Desktop View Horizontal Bar */}
      <div className="hidden lg:flex flex-row flex-wrap items-center gap-3 w-full">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium mr-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </div>
        <FilterInputs isMobile={false} />
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-bold px-2 whitespace-nowrap"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Mobile / Tablet View Toggle Button */}
      <div className="flex lg:hidden shrink-0">
        <button
          onClick={openDrawer}
          className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-gray-100 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-blue-500 text-white text-[10px] leading-tight font-black rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Drawer (Dialog) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-[320px] sm:max-w-sm h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col animate-in fade-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Search Filters
              </h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Location</label>
                <div className="flex flex-col gap-3">
                  {/* Re-use FilterInputs but in a custom order if we wanted, but calling FilterInputs directly is easiest */}
                  <FilterInputs isMobile={true} />
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex gap-3">
              <button
                onClick={clearFilters}
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={applyMobileFilters}
                className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchFilters;
