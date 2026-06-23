import React, { useRef, useEffect } from "react";
import { Animated, View } from "react-native";

export default function Spinner({ color = "#3b82f6" }) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      })
    );

    loop.start();
    return () => loop.stop();
  }, []);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="items-center justify-center">
      <Animated.View
        style={{
          width: 28,
          height: 28,
          borderWidth: 3,
          borderColor: color,
          borderTopColor: "transparent",
          borderRadius: 999,
          transform: [{ rotate }],
        }}
      />
    </View>
  );
}