import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NotificationCardProps } from "../types/notification.types";
import useAppTheme from "../hooks/useAppTheme";

export default function NotificationCard({
  username,
  photoProfile,
  type,
  isRead,
  createdAt,
  onPress,
}: NotificationCardProps) {
  const { colors } = useAppTheme();
  const iconName =
    type === "LIKE" ? "heart" : type === "follow" ? "person-add" : "chatbubble";

  const iconColor =
    type === "LIKE" ? "#ef4444" : type === "follow" ? "#22c55e" : "#3b82f6";

  const actionText =
    type === "LIKE"
      ? "liked your thread"
      : type === "follow"
        ? "started following you"
        : "replied to your thread";

  console.log("notif type:", type);
  return (
    <Pressable onPress={onPress}>
      <View
        className="rounded-3xl p-4 flex-row items-center gap-3"
        style={{ backgroundColor: colors.card }}
      >
        <Image
          source={{ uri: photoProfile }}
          className="w-12 h-12 rounded-full"
        />

        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Ionicons name={iconName as any} size={16} color={iconColor} />

            <Text className="font-semibold" style={{ color: colors.text }}>
              {username}
            </Text>
          </View>

          <Text className="text-zinc-400 mt-1" style={{ color: colors.muted }}>
            {actionText}
          </Text>

          <Text
            className="text-zinc-500 text-xs mt-2"
            style={{ color: colors.muted }}
          >
            {new Date(createdAt).toLocaleString()}
          </Text>
        </View>

        {!isRead && <View className="w-3 h-3 rounded-full bg-sky-500" />}
      </View>
    </Pressable>
  );
}
