import React from "react";
import DataTable from "./components/DataTable";
import { ThemeToggle } from "./components/ThemeToggle";
import useDeliveryStore from "./store/useDeliveryStore";
import { useDeliveryData } from "./hooks/useDelivery";
import SearchBar from "./components/SearchBar";
import SearchFilters from "./components/SearchFilters";
import DeliveryDetailModal from "./components/DeliveryDetailModal";
import TableSkeleton from "./components/TableSkeleton";

const App = () => {
  const { data, isPending, error } = useDeliveryData();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 grid grid-cols-1 gap-6 min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-center sm:text-left">Delivery System</h1>
          <ThemeToggle />
        </div>

        <div className="flex justify-center sm:justify-start">
          <SearchBar />
        </div>

        <div className="flex justify-center sm:justify-start w-full">
          <SearchFilters />
        </div>

        {isPending ? (
          <TableSkeleton />
        ) : error ? (
          <div className="flex justify-center p-10">
            <div className="text-red-500 font-medium">{error.message}</div>
          </div>
        ) : (
          <DataTable data={data} />
        )}

        <DeliveryDetailModal />
      </div>
    </div>
  );
};

export default App;
