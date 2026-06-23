import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";

export default function SplashScreen() {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.back(1.7)),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#18181b",
      }}
    >
      <Animated.View
        style={{
          alignItems: "center",
          opacity,
          transform: [{ scale }, { translateY }],
        }}
      >
        {/* Logo */}
        <View
          style={{
            width: 88,
            height: 88,
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: 24,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.15)",
            marginBottom: 18,
          }}
        >
          <Ionicons name="triangle" size={42} color="#189BF5" />
        </View>

        {/* Title */}
        <Text
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: "700",
            letterSpacing: 2,
          }}
        >
          Welcome Back
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            color: "#94a3b8",
            fontSize: 14,
            marginTop: 6,
          }}
        >
          Preparing your experience...
        </Text>
      </Animated.View>
    </View>
  );
}
