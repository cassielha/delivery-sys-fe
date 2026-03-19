import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import PaginationControls from "./PaginationControls";
import useDeliveryStore from "../store/useDeliveryStore";

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-0.5 text-yellow-400">
            {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
            {hasHalfStar && <FaStarHalfAlt />}
            {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} className="text-gray-300 dark:text-gray-600" />)}
        </div>
    );
};

const DataTable = ({ data }) => {
    const { openDetail } = useDeliveryStore();
    const deliveries = data?.deliveries || [];
    const pagination = data?.pagination || {};
    const totalCount = pagination.total || 0;
    const totalPages = pagination.totalPages || 0;

    if (!data || deliveries.length === 0) return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <div className="text-4xl mb-2 opacity-20">📦</div>
            <div className="text-gray-500 dark:text-gray-400 font-medium">No deliveries found</div>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search criteria.</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 gap-6 w-full min-w-0 overflow-hidden">
            <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 w-full min-w-0">
                <div className="min-w-[800px]">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
                        <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th scope="col" className="w-[5%] px-4 py-4 font-bold tracking-wider">ID</th>
                                <th scope="col" className="w-[20%] px-4 py-4 font-bold tracking-wider">Organization</th>
                                <th scope="col" className="w-[10%] px-4 py-4 font-bold tracking-wider">Category</th>
                                <th scope="col" className="w-[10%] px-4 py-4 font-bold tracking-wider text-right">Rating</th>
                                <th scope="col" className="w-[10%] px-4 py-4 font-bold tracking-wider text-right">City</th>
                                <th scope="col" className="w-[8%] px-4 py-4 font-bold tracking-wider text-right">State</th>
                                <th scope="col" className="w-[14%] px-4 py-4 font-bold tracking-wider text-right">Phone</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-sans">
                            {deliveries.map((delivery) => (
                                <tr
                                    key={delivery.ID}
                                    onClick={() => openDetail(delivery)}
                                    className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group cursor-pointer"
                                >
                                    <td className="px-4 py-4 font-medium text-gray-900 dark:text-gray-100">
                                        <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-[10px] font-mono">#{delivery.ID}</span>
                                    </td>
                                    <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white truncate" title={delivery.Organization}>
                                        {delivery.Organization}
                                    </td>
                                    <td className="px-4 py-4 truncate text-gray-500 dark:text-gray-400" title={delivery.Category}>
                                        {delivery.Category}
                                    </td>
                                    <td className="px-4 py-4 flex flex-row items-center justify-end gap-2">
                                        <StarRating rating={delivery.Rating || 0} />
                                        <span className="text-xs text-gray-400">({delivery.NumberReview || 0})</span>
                                    </td>
                                    <td className="px-4 py-4 text-right truncate">
                                        {delivery.City}
                                    </td>
                                    <td className="px-4 py-4 text-right truncate">
                                        {delivery.State}
                                    </td>
                                    <td className="px-4 py-4 text-right font-mono truncate">
                                        {delivery.Phone}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <PaginationControls totalCount={totalCount} totalPages={totalPages} />
        </div>
    );
};

export default DataTable;
