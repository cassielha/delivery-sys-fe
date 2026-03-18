import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../constants/global-variable";
import useDeliveryStore from "../store/useDeliveryStore";

const fetchDeliveries = async (page, limit, search) => {
    let url = `${BASE_URL}/pagination?page=${page}&limit=${limit}`;

    if (search) {
        url = `${BASE_URL}/search?name=${search}&page=${page}&limit=${limit}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch deliveries");
    }
    return data;
};

export const useDeliveryData = () => {
    const { currentPage, limit, searchQuery } = useDeliveryStore();

    return useQuery({
        queryKey: ["deliveries_data", currentPage, limit, searchQuery],
        queryFn: () => fetchDeliveries(currentPage, limit, searchQuery),
        placeholderData: (previousData) => previousData, // Keep old data while fetching
    });
};
