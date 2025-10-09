import useAuthStore from "@/stores/useAuthStore";

export const getAccessTokenFromStore = () => useAuthStore.getState().accessToken;

export const clearAuthStore = () => useAuthStore.getState().clearAuth();
