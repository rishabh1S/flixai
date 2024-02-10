import { Stack } from "expo-router";
import React from "react";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="resultModal"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
};

export default StackLayout;
