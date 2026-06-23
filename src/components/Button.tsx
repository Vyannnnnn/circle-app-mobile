import { Pressable, Text } from "react-native";
import type { ButtonProps } from "../types/button.types";
import { StyleSheet } from "react-native";

export function Button({ title, onPress, style }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
