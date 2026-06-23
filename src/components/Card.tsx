import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { CardProps } from "../types/card.types";
import useAppTheme from "../hooks/useAppTheme";

export function Card({ title, percentage, countName, icon }: CardProps) {
  const { colors } = useAppTheme();

  const percentageColor = percentage?.startsWith("+")
    ? colors.success
    : percentage?.startsWith("-")
      ? colors.danger
      : colors.muted;

  return (
    <View
      className="w-[48%] h-36 rounded-xl p-4 "
      style={{ backgroundColor: colors.card }}
    >
      <View className="flex-row items-center mb-2 justify-between">
        <Ionicons name={icon} size={24} color={colors.text} />
        <Text
          className="text-sm font-semibold"
          style={{ color: percentageColor }}
        >
          {percentage}
        </Text>
      </View>
      <View className="flex-col mt-3.5 gap-y-1">
        <Text
          className="mt-1 font-bold text-3xl"
          style={{ color: colors.text }}
        >
          {countName}
        </Text>
        <Text className=" font-semibold" style={{ color: colors.muted }}>
          {title}
        </Text>
      </View>
    </View>
  );
}
