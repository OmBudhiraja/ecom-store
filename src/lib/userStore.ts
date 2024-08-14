import { create } from "zustand";
import { type Session } from "next-auth";

type UserStore = {
  user: Session["user"] | null;
  isLoading: boolean;
  setUser: (userData: Session["user"] | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (userData) => set({ user: userData, isLoading: false }),
}));

// server dispatcher
import {} from "zustand/vanilla";
