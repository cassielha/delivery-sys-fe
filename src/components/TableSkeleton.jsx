import React from "react";
import useDeliveryStore from "../store/useDeliveryStore";

const TableSkeleton = () => {
    const { limit } = useDeliveryStore();
    const rows = Array.from({ length: limit });

    return (
        <div className="grid grid-cols-1 gap-6 w-full min-w-0 overflow-hidden animate-pulse">
            <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 w-full min-w-0">
                <div className="min-w-[800px]">
                    <table className="w-full text-sm text-left table-fixed">
                        <thead className="text-xs bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="w-[5%] px-4 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div></th>
                                <th className="w-[20%] px-4 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div></th>
                                <th className="w-[10%] px-4 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div></th>
                                <th className="w-[10%] px-4 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full ml-auto"></div></th>
                                <th className="w-[10%] px-4 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 ml-auto"></div></th>
                                <th className="w-[8%] px-4 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 ml-auto"></div></th>
                                <th className="w-[14%] px-4 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 ml-auto"></div></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {rows.map((_, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-4">
                                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-1">
                                            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 ml-auto"></div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 ml-auto"></div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full ml-auto"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-between items-center px-4 py-7 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};

export default TableSkeleton;
