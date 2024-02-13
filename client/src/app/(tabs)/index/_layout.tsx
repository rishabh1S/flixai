import { Stack } from "expo-router";
import React from "react";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="explore" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="post"
        options={{
          headerTitle: "Posts",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default StackLayout;
