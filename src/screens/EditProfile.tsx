import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import useAppTheme from "../hooks/useAppTheme";
import { updateProfile } from "../services/profile.service";
import { API_URL } from "../config/env";

export default function EditProfile({ route, navigation }: any) {
  const { colors } = useAppTheme();

  const user = route.params.user;

  const [fullName, setFullName] = useState(user.full_Name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || "");
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateProfile(fullName, username, bio, image);

      Alert.alert("Success", "Profile updated successfully");

      navigation.goBack();
    } catch (error: any) {
      console.error(error);

      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      <View className="items-center mb-8">
        <Image
          source={{
            uri: image?.uri ? image.uri : `${API_URL}${user.photo_profile}`,
          }}
          className="w-32 h-32 rounded-full"
        />

        <Pressable onPress={pickImage} className="mt-4">
          <Text
            style={{
              color: "#1d9bf0",
            }}
          >
            Change Photo
          </Text>
        </Pressable>
      </View>

      <Text className="mb-2" style={{ color: colors.text }}>
        Full Name
      </Text>

      <TextInput
        value={fullName}
        onChangeText={setFullName}
        style={{
          backgroundColor: colors.card,
          color: colors.text,
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
        }}
      />

      <Text className="mb-2" style={{ color: colors.text }}>
        Username
      </Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        style={{
          backgroundColor: colors.card,
          color: colors.text,
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
        }}
      />

      <Text className="mb-2" style={{ color: colors.text }}>
        Bio
      </Text>

      <TextInput
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={4}
        style={{
          backgroundColor: colors.card,
          color: colors.text,
          borderRadius: 16,
          padding: 16,
          minHeight: 120,
        }}
      />

      <Pressable
        onPress={handleSave}
        disabled={loading}
        className="mt-8 py-4 rounded-2xl items-center"
        style={{
          backgroundColor: "#1d9bf0",
        }}
      >
        <Text className="font-bold text-white">
          {loading ? "Saving..." : "Save Changes"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
