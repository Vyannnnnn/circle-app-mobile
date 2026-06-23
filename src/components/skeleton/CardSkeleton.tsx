import { View } from "react-native";
import ShimmerBox from "./ShimmerBox";
import useAppTheme from "../../hooks/useAppTheme";

export default function CardSkeleton() {
  const { colors } = useAppTheme();

  return (
    <View
      className="w-[48%] rounded-2xl p-4"
      style={{ backgroundColor: colors.card }}
    >
      <View className="flex-row justify-between items-start">
        <View className="gap-3">
          <ShimmerBox width={70} height={12} borderRadius={6} />

          <ShimmerBox width={40} height={30} borderRadius={6} />

          <ShimmerBox width={55} height={10} borderRadius={6} />
        </View>

        <ShimmerBox width={36} height={36} borderRadius={18} />
      </View>
    </View>
  );
}
