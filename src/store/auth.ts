import { create } from "zustand";

type User = {
  username: string;
  role: "user" | "admin";
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
