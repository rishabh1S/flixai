import { Stack } from "expo-router";
import React from "react";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="result"
        options={{
          headerTitle: "Result",
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
