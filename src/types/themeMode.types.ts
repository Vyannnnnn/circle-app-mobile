export type ThemeMode = "light" | "dark";

export type ThemeContextType = {
  theme: ThemeMode;
  toggleTheme: () => void;
};