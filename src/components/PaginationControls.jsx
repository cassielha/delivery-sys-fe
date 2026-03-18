import React, { useState, useEffect } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import useDeliveryStore from "../store/useDeliveryStore";

const PaginationControls = ({ totalCount, totalPages }) => {
    const { currentPage, setCurrentPage, limit, setLimit } = useDeliveryStore();
    const [jumpPage, setJumpPage] = useState(currentPage);

    // Sync internal jumpPage state when currentPage changes from outside
    useEffect(() => {
        setJumpPage(currentPage);
    }, [currentPage]);

    const handleJumpPage = (e) => {
        e.preventDefault();
        const pageNumber = parseInt(jumpPage);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        } else {
            // Reset to current page if invalid
            setJumpPage(currentPage);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <span className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * limit + 1}</span> to{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {Math.min(currentPage * limit, totalCount)}
                    </span>{" "}
                    of <span className="font-semibold text-gray-900 dark:text-white">{totalCount}</span> results
                </span>

                <div className="flex items-center gap-2 justify-center">
                    <select
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 transition-all outline-none cursor-pointer"
                    >
                        <option value={10}>10 per page</option>
                        <option value={15}>15 per page</option>
                        <option value={20}>20 per page</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <form onSubmit={handleJumpPage} className="flex items-center gap-2 justify-center w-full sm:w-auto">
                    <label className="text-sm text-gray-500 dark:text-gray-400">Go to:</label>
                    <input
                        type="number"
                        min="1"
                        max={totalPages || 1}
                        value={jumpPage}
                        onChange={(e) => setJumpPage(e.target.value)}
                        className="w-16 px-2 py-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                    />
                    <button
                        type="submit"
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-95"
                    >
                        Go
                    </button>
                </form>

                <div className="flex items-center gap-1 justify-center w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700 pt-4 sm:pt-0 sm:pl-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:bg-gray-200"
                    >
                        <MdNavigateBefore size={22} />
                    </button>

                    <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium min-w-[120px] justify-center text-gray-700 dark:text-gray-200">
                        Page <span className="mx-1.5 text-blue-600 dark:text-blue-400 font-bold">{currentPage}</span> of {totalPages || 1}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage >= totalPages || totalPages === 0}
                        className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:bg-gray-200"
                    >
                        <MdNavigateNext size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaginationControls;
