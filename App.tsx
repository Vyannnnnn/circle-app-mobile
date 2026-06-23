import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useMemo } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { RootStackParamList } from "./src/types/root.types";
import "./global.css";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

import { ThemeContext } from "./src/context/ThemeContext";
import { AuthContext } from "./src/context/AuthContext";

import Login from "./src/screens/Login";
import Profile from "./src/screens/Profile";
import BottomTabs from "./src/components/BottomTabs";
import useAppTheme from "./src/hooks/useAppTheme";
import MySplashScreen from "./src/screens/SplashScreen"; // custom splash component
import EditProfile from "./src/screens/EditProfile";
import ThemeButton from "./src/components/ThemeButton";

// cegah native splash auto-hide sebelum custom splash siap
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { isDarkMode, colors } = useAppTheme();

  const [showSplash, setShowSplash] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        const data = await SecureStore.getItemAsync("userData");
        const savedTheme = await SecureStore.getItemAsync("theme");

        if (savedTheme === "light" || savedTheme === "dark") {
          setTheme(savedTheme);
        }

        setUserToken(token);
        setUserData(data ? JSON.parse(data) : null);
      } catch (error) {
        console.error("Error checking auth state:", error);
      } finally {
        setIsLoading(false);
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (!appIsReady) return;
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [appIsReady]);

  const toggleTheme = async () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    await SecureStore.setItemAsync("theme", nextTheme);
  };

  const authContext = useMemo(
    () => ({
      signIn: async (token: string, user: any) => {
        await SecureStore.setItemAsync("authToken", token);
        await SecureStore.setItemAsync("userData", JSON.stringify(user));
        setUserToken(token);
        setUserData(user);
      },

      signOut: async () => {
        await SecureStore.deleteItemAsync("authToken");
        await SecureStore.deleteItemAsync("userData");
        setUserToken(null);
        setUserData(null);
      },
    }),
    [],
  );

  // native splash masih nampil
  if (!appIsReady) {
    return null;
  }

  // custom splash ampil setelah native splash hilang
  if (showSplash) {
    return <MySplashScreen />;
  }

  const navigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      primary: "#1d9bf0",
    },
  };

  return (
    <SafeAreaProvider>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <SafeAreaView className="flex-1">
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <AuthContext.Provider value={authContext}>
            <NavigationContainer theme={navigationTheme}>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: { backgroundColor: colors.background },
                  headerTintColor: colors.text,
                  contentStyle: { backgroundColor: colors.background },
                }}
              >
                {!userToken ? (
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                  />
                ) : (
                  <>
                    <Stack.Screen
                      name="MainApp"
                      component={BottomTabs}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen
                      name="EditProfile"
                      component={EditProfile}
                      options={{
                        title: "Edit Profile",
                        headerShown: false,
                      }}
                    />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
            <ThemeButton />
          </AuthContext.Provider>
        </ThemeContext.Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
