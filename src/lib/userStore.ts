import { create } from "zustand";
import { type User } from "~/types";

type UserStore = {
  user: User | null;
  isLoading: boolean;
  setUser: (userData: User | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (userData) => set({ user: userData, isLoading: false }),
}));
