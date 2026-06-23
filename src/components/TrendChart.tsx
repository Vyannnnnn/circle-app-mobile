import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import useAppTheme from "../hooks/useAppTheme";

const lineData = [
  { value: 120, label: "Mon" },
  { value: 150, label: "Tue" },
  { value: 90, label: "Wed" },
  { value: 180, label: "Thu" },
  { value: 220, label: "Fri" },
  { value: 190, label: "Sat" },
  { value: 250, label: "Sun" },
];

export function TrendChart() {
  const { colors } = useAppTheme();
  return (
    <View className="rounded-2xl p-4" style={{ backgroundColor: colors.card }}>
      <View className="flex-row justify-between mb-4">
        <View>
          <Text className="text-zinc-400" style={{ color: colors.muted }}>
            Total Engagement
          </Text>

          <Text className="text-white text-3xl font-bold" style={{ color: colors.text }}>
            24.8K
          </Text>
        </View>

        <Text className="text-green-400 font-semibold" style={{ color: colors.success }}>
          +12.4%
        </Text>
      </View>

      <LineChart
        data={lineData}
        areaChart
        curved
        color="#1d9bf0"
        thickness={3}
        startFillColor="#1d9bf0"
        endFillColor="#1d9bf0"
        startOpacity={0.25}
        endOpacity={0.02}
        hideRules
        hideDataPoints
        xAxisColor="transparent"
        yAxisColor="transparent"
        yAxisTextStyle={{ color: "#71717a" }}
        xAxisLabelTextStyle={{ color: "#71717a" }}
      />
    </View>
  );
}
