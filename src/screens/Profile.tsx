import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { RefreshControl } from "react-native";

import { loadUser } from "../services/dashboard.service";
import { API_URL } from "../config/env";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import useAppTheme from "../hooks/useAppTheme";
import ProfileSkeleton from "../components/skeleton/ProfileSkeleton";

export default function Profile({ navigation }: any) {
  const [user, setUser] = useState<any>(null);
  const { signOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { colors } = useAppTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await loadUser();
        await new Promise((resolve) => setTimeout(resolve, 800));

        setUser(data);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setLoading(true);

      const data = await loadUser();

      await new Promise((resolve) => setTimeout(resolve, 800));

      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#189BF5"
        />
      }
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      {loading ? (
        <>
          <ProfileSkeleton />
        </>
      ) : (
        <>
          {/* Header Card */}
          <View
            className="rounded-3xl p-5 items-center relative"
            style={{
              backgroundColor: colors.card,
            }}
          >

            {/* Avatar */}
            <Image
              source={{
                uri: user?.photo_profile
                  ? `${API_URL}${user.photo_profile}`
                  : "https://www.gravatar.com/avatar/?d=mp",
              }}
              className="w-28 h-28 rounded-full border-4"
              style={{
                borderColor: colors.border,
              }}
            />

            <Text
              className="text-2xl font-bold mt-3"
              style={{
                color: colors.text,
              }}
            >
              {user?.full_Name || "Unknown User"}
            </Text>

            <Text style={{ color: colors.muted }}>
              @{user?.username || "username"}
            </Text>
          </View>

          {/* Bio */}
          <View
            className="rounded-3xl p-4 mt-4"
            style={{
              backgroundColor: colors.card,
            }}
          >
            <Text className="mb-2" style={{ color: colors.muted }}>
              Bio
            </Text>
            <Text style={{ color: colors.text }}>
              {user?.bio || "No bio available"}
            </Text>
          </View>

          {/* Account Info */}
          <View
            className="rounded-3xl p-4 mt-4 mb-5"
            style={{
              backgroundColor: colors.card,
            }}
          >
            <Text className="mb-3" style={{ color: colors.muted }}>
              Account Information
            </Text>

            <View className="gap-3">
              <View>
                <Text className="text-sm" style={{ color: colors.muted }}>
                  Username
                </Text>
                <Text style={{ color: colors.text }}>{user?.username}</Text>
              </View>

              <View>
                <Text className="text-sm" style={{ color: colors.muted }}>
                  Email
                </Text>
                <Text style={{ color: colors.text }}>{user?.email}</Text>
              </View>
            </View>
          </View>
        </>
      )}

      {/* Edit Profile Button */}
      <Pressable
        className="rounded-3xl mt-4 py-4 items-center border-2"
        onPress={() => navigation.navigate("EditProfile", { user })}
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
      >
        <Text style={{ color: colors.text }}>Edit Profile</Text>
      </Pressable>

      {/* Logout */}
      <Pressable
        onPress={signOut}
        className="rounded-3xl mt-4 py-4 items-center border-2"
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
      >
        <Text className="font-semibold" style={{ color: colors.danger }}>
          Logout
        </Text>
      </Pressable>
    </ScrollView>
  );
}
