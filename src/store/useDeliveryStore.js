import { create } from 'zustand';

const useDeliveryStore = create((set) => ({
    // State
    isModalOpen: false,
    modalMode: "add", // "add" | "edit"
    selectedDelivery: null,
    deliveryToDelete: null,
    isDeleteModalOpen: false,
    isDetailModalOpen: false,
    currentPage: 1,
    limit: 10,
    searchQuery: "",

    // Actions
    openAdd: () => set({
        modalMode: "add",
        selectedDelivery: null,
        isModalOpen: true
    }),

    openEdit: (delivery) => set({
        selectedDelivery: delivery,
        modalMode: "edit",
        isModalOpen: true
    }),

    openDeleteModal: (delivery) => set({
        deliveryToDelete: delivery,
        isDeleteModalOpen: true
    }),

    openDetail: (delivery) => set({
        selectedDelivery: delivery,
        isDetailModalOpen: true
    }),

    closeModal: () => set({
        isModalOpen: false,
        selectedDelivery: null
    }),

    closeDeleteModal: () => set({
        isDeleteModalOpen: false,
        deliveryToDelete: null
    }),

    closeDetail: () => set({
        isDetailModalOpen: false,
        selectedDelivery: null
    }),

    setCurrentPage: (page) => set((state) => ({
        currentPage: typeof page === 'function' ? page(state.currentPage) : page
    })),
    setLimit: (limit) => set((state) => ({
        limit: typeof limit === 'function' ? limit(state.limit) : limit
    })),
    setSearchQuery: (query) => set((state) => ({
        searchQuery: typeof query === 'function' ? query(state.searchQuery) : query
    })),
}));

export default useDeliveryStore;
