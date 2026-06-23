import { api } from "./auth.service";
import * as SecureStore from "expo-secure-store";


export const updateProfile = async (
  full_Name: string,
  username: string,
  bio: string,
  image?: any,
) => {
  const formData = new FormData();

  formData.append("full_Name", full_Name);
  formData.append("username", username);
  formData.append("bio", bio);

  if (image) {
    formData.append("image", {
      uri: image.uri,
      name: image.fileName || "profile.jpg",
      type: image.mimeType || "image/jpeg",
    } as any);
  }
  const token = await SecureStore.getItemAsync("authToken");

  const response = await api.put("/auth/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
