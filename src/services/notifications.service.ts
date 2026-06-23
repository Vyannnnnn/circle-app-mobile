import * as SecureStore from "expo-secure-store";
import { api } from "./auth.service";

export async function getNotifications() {
  const token = await SecureStore.getItemAsync("authToken");

  const response = await api.get("/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.notifications;
}

export const markAsRead = async (id: number) => {
  const token = await SecureStore.getItemAsync("authToken");

  return api.patch(
    `/notifications/${id}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
