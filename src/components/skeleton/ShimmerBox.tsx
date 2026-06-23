import React, { useEffect } from "react";
import { View, StyleSheet, DimensionValue } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import useAppTheme from "../../hooks/useAppTheme";

type Props = {
  width?: DimensionValue;
  height: number;
  borderRadius?: number;
};

export default function ShimmerBox({
  width = "100%",
  height,
  borderRadius = 8,
}: Props) {
  const { colors, isDarkMode } = useAppTheme();

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1200 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [-200, 200]);

    return {
      transform: [{ translateX }],
    };
  });

  const baseColor = isDarkMode ? "#1f1f1f" : "#e5e7eb";
  const highlight = isDarkMode
    ? "rgba(255,255,255,0.08)"
    : "rgba(255,255,255,0.7)";

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor: baseColor,
        },
      ]}
    >
      <Animated.View style={[styles.shimmer, animatedStyle]}>
        <LinearGradient
          colors={["transparent", highlight, "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  shimmer: {
    width: "60%",
    height: "100%",
    position: "absolute",
    left: "-30%",
  },
});
