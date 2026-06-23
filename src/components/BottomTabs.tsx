import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RootTabParamList } from "../types/root.types";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Activity from "../screens/Activity";
import Analytic from "../screens/Analytic";
import useAppTheme from "../hooks/useAppTheme";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabs() {
  const { colors } = useAppTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Analytics") {
            iconName = focused ? "analytics" : "analytics-outline";
          } else if (route.name === "Activity") {
            iconName = focused ? "list" : "list-outline";
          } else {
            iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1d9bf0",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}  
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={Analytic}
        options={{ tabBarLabel: "Analytics" }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{ tabBarLabel: "Activity" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}
