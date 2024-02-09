import { Stack, router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Button, Text } from "tamagui";
import { Ionicons } from "@expo/vector-icons";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.replace("/account/");
              }}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Button onPress={() => router.push("/account/edit")} size="$2">
              Edit Profile
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          headerTitle: "Edit Profile",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.replace("/account/");
              }}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default StackLayout;
