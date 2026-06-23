import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";

import { API_URL } from "../config/env";
import { UserData } from "../types/auth.types";

import { loadUser } from "../services/dashboard.service";
import { MyDropdown } from "../components/Dropdown";
import ThreadCard from "../components/ThreadCard";
import { getTopThreads } from "../services/analytics.service";
import { ThreadAnalytics } from "../types/analytics.types";
import useAppTheme from "../hooks/useAppTheme";

const PULL_THRESHOLD = 80; // jarak pull (px) buat trigger refresh

export default function Analytic() {
  const [user, setUser] = useState<UserData | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [threads, setThreads] = useState<ThreadAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useAppTheme();
  const [filter, setFilter] = useState("today");

  const isPulling = useRef(false);
  const hasTriggered = useRef(false);

  const profileImage = user?.photo_profile
    ? `${API_URL}${user.photo_profile}`
    : "https://www.gravatar.com/avatar/?d=mp";

  const loadData = async () => {
    try {
      const userData = await loadUser();
      const threadsData = await getTopThreads();

      setThreads(threadsData);
      setUser(userData);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredThreads = threads.filter((thread) => {
    const now = new Date();
    const threadDate = new Date(thread.createdAt);

    switch (filter) {
      case "today":
        return (
          threadDate.getDate() === now.getDate() &&
          threadDate.getMonth() === now.getMonth() &&
          threadDate.getFullYear() === now.getFullYear()
        );
      case "week":
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);

        return threadDate >= weekStart;
      case "month":
        return (
          threadDate.getMonth() === now.getMonth() &&
          threadDate.getFullYear() === now.getFullYear()
        );
      case "year":
        return threadDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  });

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
        data={filteredThreads}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThreadCard
            createdAt={item.createdAt}
            image={item.image}
            content={item.content}
            likesCount={item.likesCount}
            repliesCount={item.repliesCount}
            engagement={item.engagement}
          />
        )}
        ListEmptyComponent={
          <View
            className="rounded-3xl p-6 items-center mt-4"
            style={{ backgroundColor: colors.card }}
          >
            <Text className="text-5xl mb-3">📈</Text>

            <Text className="text-lg font-bold" style={{ color: colors.text }}>
              No Threads Yet
            </Text>

            <Text className="text-center mt-2" style={{ color: colors.muted }}>
              Publish your first thread to start tracking likes, replies, and
              engagement.
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
          paddingTop: refreshing ? 40 : 20,
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
                  Top Performing Threads
                </Text>
              </View>

              <Image
                source={{ uri: profileImage }}
                className="w-14 h-14 rounded-full"
              />
            </View>

            {/* Description */}
            <View
              className="flex-row items-center justify-between mt-10 rounded-2xl"
              style={{ backgroundColor: colors.card }}
            >
              <Text
                className="leading-5 py-4 px-4"
                style={{ color: colors.muted }}
              >
                Recent activity
              </Text>

              <View className="w-40">
                <MyDropdown value={filter} onChange={setFilter} />
              </View>
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
