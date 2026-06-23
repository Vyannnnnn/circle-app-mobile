import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { api } from "../services/auth.service";
import * as SecureStore from "expo-secure-store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const { signIn } = useContext(AuthContext);

  // validation function
  function validate(): boolean {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleLogin() {
    if (!validate()) return;
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });
      const token = response.data.token;
      const user = response.data.data;
      await SecureStore.setItemAsync("authToken", token);
      await SecureStore.setItemAsync("userData", JSON.stringify(user));

      signIn(token, user);
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="flex-1 bg-neutral-950">
        {/* Top gradient accent */}
        <View className="absolute top-0 left-0 right-0 h-72 bg-[#1d9bf0] rounded-b-[60px] opacity-90" />
        <View className="absolute top-8 left-6 right-6 h-56 bg-[#166194] rounded-b-[50px] opacity-40" />

        {/* Content */}
        <View className="flex-1 justify-center px-7 pt-12">
          {/* Logo / Brand */}
          <View className="items-center mb-10">
            <View className="w-20 h-20 bg-white/10 rounded-3xl items-center justify-center mb-5 border border-white/20">
              <Ionicons name="triangle" size={40} color="#189BF5" />
            </View>
            <Text className="text-white text-3xl font-bold tracking-wider">
              Welcome Back
            </Text>
            <Text className="text-neutral-400 text-base mt-2">
              Sign in to continue
            </Text>
          </View>

          {/* Form Card */}
          <View className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800">
            {/* Email Input */}
            <View className="mb-5">
              <Text className="text-neutral-400 text-sm font-medium mb-2 ml-1">
                Email
              </Text>
              <View
                className={`flex-row items-center bg-neutral-800/70 rounded-2xl px-4 h-14 border ${
                  errors.email ? "border-red-500/70" : "border-neutral-700/50"
                }`}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={errors.email ? "#ef4444" : "#737373"}
                />
                <TextInput
                  className="flex-1 text-white text-base ml-3"
                  placeholder="your@email.com"
                  placeholderTextColor="#525252"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email)
                      setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.email && (
                <Text className="text-red-400 text-xs mt-1.5 ml-1">
                  {errors.email}
                </Text>
              )}
            </View>

            {/* Password Input */}
            <View className="mb-7">
              <Text className="text-neutral-400 text-sm font-medium mb-2 ml-1">
                Password
              </Text>
              <View
                className={`flex-row items-center bg-neutral-800/70 rounded-2xl px-4 h-14 border ${
                  errors.password
                    ? "border-red-500/70"
                    : "border-neutral-700/50"
                }`}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={errors.password ? "#ef4444" : "#737373"}
                />
                <TextInput
                  className="flex-1 text-white text-base ml-3"
                  placeholder="••••••••"
                  placeholderTextColor="#525252"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password)
                      setErrors((p) => ({ ...p, password: undefined }));
                  }}
                  // secureTextEntry={!showPassword}
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={10}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#737373"
                  />
                </Pressable>
              </View>
              {errors.password && (
                <Text className="text-red-400 text-xs mt-1.5 ml-1">
                  {errors.password}
                </Text>
              )}
            </View>

            {/* Login Button */}
            <Pressable
              onPress={handleLogin}
              disabled={isLoading}
              className={`h-14 rounded-2xl items-center justify-center ${
                isLoading ? "bg-[#166194]" : "bg-[#1d9bf0]"
              }`}
              style={({ pressed }) => ({
                opacity: pressed && !isLoading ? 0.85 : 1,
                transform: [{ scale: pressed && !isLoading ? 0.98 : 1 }],
              })}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text className="text-white text-base font-bold tracking-wide">
                  Sign In
                </Text>
              )}
            </Pressable>
          </View>

          {/* Forgot password */}
          <Pressable className="mt-5 items-center">
            <Text className="text-[#1d9bf0] text-sm">Forgot password?</Text>
          </Pressable>
        </View>

        {/* Bottom section */}
        <View className="pb-10 items-center">
          <Text className="text-neutral-500 text-sm">
            Don't have an account?{" "}
            <Text className="text-[#1d9bf0] font-semibold">Sign Up</Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
