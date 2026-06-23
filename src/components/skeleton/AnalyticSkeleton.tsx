import React from "react";
import { View } from "react-native";
import useAppTheme from "../../hooks/useAppTheme";

const { colors } = useAppTheme();

export const AnalyticSkeleton = () => (
  <View
    style={{
      height: 80,
      borderRadius: 16,
      backgroundColor: colors.card,
      opacity: 0.6,
    }}
  />
);
