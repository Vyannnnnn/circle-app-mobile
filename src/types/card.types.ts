import { Ionicons } from "@expo/vector-icons";


export type CardProps = {
  title?: string;
  percentage?: string;
  countName?: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  color?: string;
};