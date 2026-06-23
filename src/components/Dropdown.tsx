import { Dropdown } from "react-native-element-dropdown";
import useAppTheme from "../hooks/useAppTheme";
import { DropdownProps } from "../types/analytics.types";

const data = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

export function MyDropdown({ value, onChange }: DropdownProps) {
  const { colors } = useAppTheme();
  return (
    <Dropdown
      data={data}
      labelField="label"
      valueField="value"
      placeholder="Select"
      value={value}
      onChange={(item) => {
        onChange(item.value);
      }}
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        paddingHorizontal: 18,
        height: 40,
      }}
      placeholderStyle={{
        color: colors.muted,
      }}
      selectedTextStyle={{
        color: colors.text,
      }}
      containerStyle={{
        backgroundColor: colors.card,
        borderRadius: 12,
        borderWidth: 0,
      }}
      itemContainerStyle={{
        backgroundColor: colors.card,
      }}
      itemTextStyle={{
        color: colors.muted,
      }}
    />
  );
}
