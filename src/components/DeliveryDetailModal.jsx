import React from "react";
import { IoClose } from "react-icons/io5";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
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

const DeliveryDetailModal = () => {
    const { isDetailModalOpen, closeDetail, selectedDelivery } = useDeliveryStore();

    if (!isDetailModalOpen || !selectedDelivery) return null;

    const details = [
        { label: "ID", value: `#${selectedDelivery.ID}` },
        { label: "Category", value: selectedDelivery.Category },
        { label: "Phone", value: selectedDelivery.Phone },
        { label: "Time (GMT)", value: selectedDelivery.Time_GMT },
        { label: "Country", value: `${selectedDelivery.Country} (${selectedDelivery.CountryCode})` },
        { label: "State", value: selectedDelivery.State },
        { label: "City", value: selectedDelivery.City },
        { label: "Address", value: `${selectedDelivery.Street || ""} ${selectedDelivery.Building || ""}`.trim() || "N/A" },
        { label: "OLF", value: selectedDelivery.OLF || "N/A" },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative p-6 border-b border-gray-100 dark:border-gray-800">
                    <button
                        onClick={closeDetail}
                        className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <IoClose size={24} />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-10">
                        {selectedDelivery.Organization}
                    </h2>
                    <div className="mt-2 flex items-center gap-3">
                        <StarRating rating={selectedDelivery.Rating || 0} />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({selectedDelivery.NumberReview || 0} reviews)
                        </span>
                    </div>
                </div>


                <div className="p-8 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {details.map((detail, index) => (
                            <div key={index} className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                    {detail.label}
                                </label>
                                <p className="text-gray-900 dark:text-gray-100 font-medium">
                                    {detail.value || "N/A"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
                    <button
                        onClick={closeDetail}
                        className="px-6 py-2.5 rounded-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDetailModal;
