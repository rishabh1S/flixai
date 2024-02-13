import React from "react";
import { Tabs } from "expo-router";
import { View } from "tamagui";
import { colorTokens } from "@tamagui/themes";
import {
  Ionicons,
  AntDesign,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorTokens.light.red.red9,
        tabBarStyle: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          height: 55,
        },
        tabBarIconStyle: {
          marginBottom: 8,
        },
        tabBarShowLabel: false,
      }}
      tabBar={(props) => (
        <View>
          <BottomTabBar {...props} />
        </View>
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="generate"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="wand-magic-sparkles" size={26} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="save"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="perm-media" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
