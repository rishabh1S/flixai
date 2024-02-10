import { Stack, router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="detail"
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "black",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.replace("/save/");
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
