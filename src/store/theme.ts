import { create } from "zustand";

type ThemeState = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setInitialTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = newTheme;
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),
  setInitialTheme: () => {
    const storedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "light";
    document.documentElement.dataset.theme = storedTheme;
    set({ theme: storedTheme });
  },
}));
