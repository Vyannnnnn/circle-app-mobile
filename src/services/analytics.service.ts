import * as SecureStore from "expo-secure-store";
import { api } from "./auth.service";

export async function getTopThreads() {
  const token = await SecureStore.getItemAsync(
    "authToken"
  );

  const response = await api.get(
    "/auth/analytics/top-threads",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}