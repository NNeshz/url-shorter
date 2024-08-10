import { create } from "zustand";

interface IAuthStore {
  authenticatedLoading: boolean;
}

interface IAuthStoreActions {
  setAuthenticatedLoading: (loading: boolean) => void;
}

export const useAuthStore = create<IAuthStore & IAuthStoreActions>((set) => ({
  authenticatedLoading: false,
  setAuthenticatedLoading: (loading) => set({ authenticatedLoading: loading }),
}));
