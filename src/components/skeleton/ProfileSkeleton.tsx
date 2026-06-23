import React from "react";
import { View } from "react-native";
import ShimmerBox from "./ShimmerBox";
import useAppTheme from "../../hooks/useAppTheme";

export default function ProfileSkeleton() {
  const { colors } = useAppTheme();

  return (
    <View style={{ gap: 16, padding: 20 }}>
      {/* Header Card */}
      <View
        style={{
          backgroundColor: colors.card,
          padding: 20,
          borderRadius: 20,
          alignItems: "center",
        }}
      >
        <ShimmerBox width={100} height={100} borderRadius={999} />
        <View style={{ marginTop: 12, gap: 8 }}>
          <ShimmerBox width={140} height={14} />
          <ShimmerBox width={90} height={10} />
        </View>
      </View>

      {/* Bio */}
      <View
        style={{
          backgroundColor: colors.card,
          padding: 16,
          borderRadius: 20,
        }}
      >
        <ShimmerBox width={60} height={12} />
        <View style={{ marginTop: 10, gap: 8 }}>
          <ShimmerBox width="100%" height={10} />
          <ShimmerBox width="80%" height={10} />
        </View>
      </View>

      {/* Account */}
      <View
        style={{
          backgroundColor: colors.card,
          padding: 16,
          borderRadius: 20,
        }}
      >
        <ShimmerBox width={120} height={12} />
        <View style={{ marginTop: 12, gap: 10 }}>
          <ShimmerBox width="70%" height={10} />
          <ShimmerBox width="50%" height={10} />
        </View>
      </View>
    </View>
  );
}