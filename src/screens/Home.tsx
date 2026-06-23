import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image, ScrollView, RefreshControl } from "react-native";

import type { UserData } from "../types/auth.types";

import { Card } from "../components/Card";
import { TrendChart } from "../components/TrendChart";
import type { DashboardStats } from "../types/dashboard.types";
import useAppTheme from "../hooks/useAppTheme";

import { getDashboardStats, loadUser } from "../services/dashboard.service";

import { API_URL } from "../config/env";
import CardSkeleton from "../components/skeleton/CardSkeleton";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {
  const { colors } = useAppTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    followers: 0,
    likes: 0,
    threads: 0,
    replies: 0,

    growth: {
      followers: { current: 0, previous: 0 },
      likes: { current: 0, previous: 0 },
      threads: { current: 0, previous: 0 },
      replies: { current: 0, previous: 0 },
    },
  });

  const [user, setUser] = useState<UserData | null>(null);

  const profileImage = user?.photo_profile
    ? `${API_URL}${user.photo_profile}`
    : "https://www.gravatar.com/avatar/?d=mp";

  const getGrowth = (current: number, previous: number) => {
    if (previous === 0) {
      return current > 0 ? "+100%" : "0%";
    }

    const diff = ((current - previous) / previous) * 100;

    return `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}%`;
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const [statsData, userData] = await Promise.all([
          getDashboardStats(),
          loadUser(),
        ]);
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        setStats(statsData);
        setUser(userData);
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

      const [statsData, userData] = await Promise.all([
        getDashboardStats(),
        loadUser(),
      ]);

      await new Promise((resolve) => setTimeout(resolve, 800));

      setStats(statsData);
      setUser(userData);
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
    >
      <View className="flex-1 px-5 py-5">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-3xl font-bold" style={{ color: colors.text }}>
              Hello, {user?.full_Name ?? "John"}
            </Text>

            <Text className="mt-1" style={{ color: colors.muted }}>
              Welcome back to your dashboard
            </Text>
          </View>

          <Image
            source={{ uri: profileImage }}
            className="w-14 h-14 rounded-full"
          />
        </View>

        {/* Description */}
        <Text
          className=" leading-5 mt-9 py-5 px-4 rounded-2xl"
          style={{ color: colors.muted, backgroundColor: colors.card }}
        >
          Here's a quick snapshot of your recent activity and engagement stats.
        </Text>

        {/* Stats */}
        <View className="mt-8 gap-3 flex-row flex-wrap">
          {loading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              <Card
                title="Followers"
                percentage={getGrowth(
                  stats.growth.followers.current,
                  stats.growth.followers.previous,
                )}
                countName={stats.followers.toString()}
                icon="people-outline"
              />
              <Card
                title="Likes"
                percentage={getGrowth(
                  stats.growth.likes.current,
                  stats.growth.likes.previous,
                )}
                countName={stats.likes.toString()}
                icon="heart-outline"
              />

              <Card
                title="Threads"
                percentage={getGrowth(
                  stats.growth.threads.current,
                  stats.growth.threads.previous,
                )}
                countName={stats.threads.toString()}
                icon="chatbubbles-outline"
              />

              <Card
                title="Replies"
                percentage={getGrowth(
                  stats.growth.replies.current,
                  stats.growth.replies.previous,
                )}
                countName={stats.replies.toString()}
                icon="arrow-undo-outline"
              />
            </>
          )}
        </View>

        {/* Weekly Trend */}
        <View className="mt-8">
          <TrendChart />
        </View>
      </View>
    </ScrollView>
  );
}
