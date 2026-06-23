import { createContext } from "react";

import type { ThemeContextType } from "../types/themeMode.types";

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});
