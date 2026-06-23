import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";

import { API_URL } from "../config/env";
import { UserData } from "../types/auth.types";

import { loadUser } from "../services/dashboard.service";
import NotificationCard from "../components/NotificationCard";
import {
  getNotifications,
  markAsRead,
} from "../services/notifications.service";
import { Notification } from "../types/notification.types";
import useAppTheme from "../hooks/useAppTheme";

const PULL_THRESHOLD = 80; // jarak pull (px) buat trigger refresh

export default function Activity() {
  const [user, setUser] = useState<UserData | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useAppTheme();

  const isPulling = useRef(false);
  const hasTriggered = useRef(false);

  const profileImage = user?.photo_profile
    ? `${API_URL}${user.photo_profile}`
    : "https://www.gravatar.com/avatar/?d=mp";

  const loadData = async () => {
    try {
      const userData = await loadUser();
      const notificationsData = await getNotifications();

      setNotifications(notificationsData);
      setUser(userData);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const triggerRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    console.log("start refresh");
    try {
      await loadData();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setRefreshing(false);
      setPullDistance(0);
      hasTriggered.current = false;
      console.log("end refresh");
    }
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY < 0) {
      const distance = Math.abs(offsetY);
      isPulling.current = true;
      setPullDistance(distance);

      if (distance >= PULL_THRESHOLD && !hasTriggered.current && !refreshing) {
        hasTriggered.current = true;
      }
    }
  };

  const handleScrollEndDrag = () => {
    if (hasTriggered.current && !refreshing) {
      triggerRefresh();
    } else if (!refreshing) {
      setPullDistance(0);
    }
    isPulling.current = false;
  };

  const handleNotificationPress = async (id: number) => {
    try {
      await markAsRead(id);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
    } catch (error: any) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <View
        className="absolute top-0 left-0 right-0 h-10 flex-end z-10 py-5 items-center "

        style={{
          backgroundColor: colors.background,
          opacity: refreshing ? 1 : Math.min(pullDistance / PULL_THRESHOLD, 1),
        }}
      >
        <ActivityIndicator
          size="small"
          color="#1d9bf0"
          animating={refreshing || pullDistance > 0}
        />
      </View>

      <FlatList
        style={{ backgroundColor: colors.background }}
        alwaysBounceVertical={true}
        bounces={true}
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NotificationCard
            type={item.type}
            username={item.sender.username}
            photoProfile={
              item.sender.photo_profile
                ? `${item.sender.photo_profile}`
                : "https://www.gravatar.com/avatar/?d=mp"
            }
            isRead={item.isRead}
            createdAt={item.createdAt}
            onPress={() => handleNotificationPress(item.id)}
          />
        )}
        ListEmptyComponent={
          <View
            className="rounded-3xl p-6 items-center mt-4"
            style={{ backgroundColor: colors.card }}
          >
            <Text className="text-5xl mb-3">🔔</Text>

            <Text className="text-lg font-bold" style={{ color: colors.text }}>
              No Activity Yet
            </Text>

            <Text className="text-center mt-2" style={{ color: colors.muted }}>
              You haven't received any notifications yet. Once you do, they'll
              appear here.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          flexGrow: 1,
          paddingTop: refreshing ? 50 : 20,
        }}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View className="flex-row items-center justify-between">
              <View>
                <Text
                  className="text-3xl font-bold"
                  style={{ color: colors.text }}
                >
                  Recent Activity
                </Text>
              </View>

              <Image
                source={{ uri: profileImage }}
                className="w-14 h-14 rounded-full"
              />
            </View>

            {/* Description */}
            <View
              className="rounded-3xl p-5 mt-8"
              style={{ backgroundColor: colors.card }}
            >
              <Text
                className="text-lg font-bold"
                style={{ color: colors.text }}
              >
                Notifications
              </Text>

              <Text className="mt-2" style={{ color: colors.muted }}>
                Follow, like and reply activities from other users.
              </Text>
            </View>

            {/* spacing sebelum card pertama */}
            <View className="h-8" />
          </>
        }
        ItemSeparatorComponent={() => <View className="h-3" />}
      />
    </>
  );
}
