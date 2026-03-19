import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../constants/global-variable";
import useDeliveryStore from "../store/useDeliveryStore";

const fetchDeliveries = async (page, limit, search, filters = {}) => {
    let url = `${BASE_URL}/pagination?page=${page}&limit=${limit}`;

    const hasFilters = Object.values(filters).some(val => val !== "");

    if (search || hasFilters) {
        url = `${BASE_URL}/search?page=${page}&limit=${limit}`;
        if (search) url += `&name=${encodeURIComponent(search)}`;
        if (filters.state) url += `&state=${encodeURIComponent(filters.state)}`;
        if (filters.city) url += `&city=${encodeURIComponent(filters.city)}`;
        if (filters.category) url += `&category=${encodeURIComponent(filters.category)}`;
        if (filters.minRating) url += `&minRating=${encodeURIComponent(filters.minRating)}`;
        if (filters.maxRating) url += `&maxRating=${encodeURIComponent(filters.maxRating)}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch deliveries");
    }
    return data;
};

export const useDeliveryData = () => {
    const { currentPage, limit, searchQuery, filters } = useDeliveryStore();

    return useQuery({
        queryKey: ["deliveries_data", currentPage, limit, searchQuery, filters],
        queryFn: () => fetchDeliveries(currentPage, limit, searchQuery, filters),
        //placeholderData: (previousData) => previousData,
    });
};
