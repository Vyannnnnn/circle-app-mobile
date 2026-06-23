import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image } from "react-native";
import { API_URL } from "../config/env";

import { ThreadCardProps } from "../types/analytics.types";
import useAppTheme from "../hooks/useAppTheme";

export default function ThreadCard({
  content,
  likesCount,
  repliesCount,
  engagement,
  createdAt,
  image,
}: ThreadCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString();
  const { colors } = useAppTheme();
  return (
    <View className="rounded-2xl p-4 w-full" style={{ backgroundColor: colors.card }}>
      {/* Date */}
      <Text className="text-xs mb-2" style={{ color: colors.muted }}>
        {formattedDate}
      </Text>

      {/* Content */}
      <Text className="text-base mb-3" style={{ color: colors.text }}>
        {content}
      </Text>

      {/* Image */}
      {image && (
        <Image
          source={{ uri: `${API_URL}${image}` }}
          className="w-full h-52 rounded-xl mb-3"
          resizeMode="cover"
        />
      )}

      {/* Engagement */}
      <Text className="text-sky-400 text-xs mb-3" style={{ color: colors.muted }}>
        Engagement: {engagement}
      </Text>

      {/* Stats */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Ionicons name="chatbubble-ellipses-outline" size={14} color="#888" />
          <Text className="text-xs" style={{ color: colors.muted }}>
            {repliesCount} replies
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons name="heart-outline" size={14} color="#888" />
          <Text className="text-xs" style={{ color: colors.muted }}>
            {likesCount} likes
          </Text>
        </View>
      </View>
    </View>
  );
}
