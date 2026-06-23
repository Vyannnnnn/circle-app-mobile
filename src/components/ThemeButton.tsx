// src/components/FloatingThemeButton.tsx
import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import useAppTheme from "../hooks/useAppTheme";

export default function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        position: "absolute",
        top: 70,
        right: 20,
        zIndex: 999,
      }}
    >
      <Pressable
        onPress={toggleTheme}
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 999,
          elevation: 5,
        }}
        pointerEvents="box-none"
      >
        <Text style={{ color: colors.text, fontSize: 12 }}>
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </Text>
      </Pressable>
    </View>
  );
}