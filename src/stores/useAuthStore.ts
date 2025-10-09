import { create } from "zustand";
import { persist } from "zustand/middleware";
import { APP_NAME } from "@/constants";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  setAuth: (data: { accessToken: string; refreshToken: string }) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,

      setAuth: ({ accessToken, refreshToken }) =>
        set({
          accessToken,
          refreshToken,
          isLoggedIn: true,
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: APP_NAME.toLowerCase().replace(/\s+/g, "-") + "-auth-storage",
    }
  )
);

export default useAuthStore;
