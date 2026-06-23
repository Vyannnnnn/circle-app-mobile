import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function useAppTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDarkMode = theme === "dark";
  return {
    isDarkMode,
    colors: {
      background: isDarkMode ? "#18181b" : "#fafafa",
      card: isDarkMode ? "#27272a" : "#eeeeee",
      text: isDarkMode ? "#fafafa" : "#18181b",
      muted: isDarkMode ? "#a1a1aa" : "#71717a",
      success: isDarkMode ? "#4ade80" : "#16a34a",
      border: isDarkMode ? "#3f3f46" : "#e4e4e7",
      danger: isDarkMode ? "#f87171" : "#dc2626",
    },
    toggleTheme,
  };
}
