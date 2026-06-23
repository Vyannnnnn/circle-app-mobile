import * as SecureStore from "expo-secure-store";
import { api } from "./auth.service";

export async function getFollowersCount() {
  const token = await SecureStore.getItemAsync("authToken");

  const response = await api.get("/auth/follows?type=followers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data.length;
}

export async function loadUser() {
  const token = await SecureStore.getItemAsync("authToken");

  const response = await api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

export async function getDashboardStats() {
  const token = await SecureStore.getItemAsync("authToken");

  const response = await api.get("/auth/dashboard/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}
