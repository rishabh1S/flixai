import { LinearGradient } from "@tamagui/linear-gradient";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Text, Label, View, YStack, Button } from "tamagui";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { router } from "expo-router";

export default function AccountScreen() {
  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <SafeAreaView
        style={{
          marginBottom: 15,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Label fontSize={"$7"}>Account</Label>
      </SafeAreaView>
      <YStack alignItems="center" gap="$2">
        <YStack alignItems="center">
          <Avatar circular size={"$10"}>
            <Avatar.Image
              accessibilityLabel="Cam"
              src={
                "https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              }
            />
            <Avatar.Fallback backgroundColor="$red10" />
          </Avatar>
          <Pressable onPress={() => router.push("/account/edit")}>
            <View
              marginTop="$-3"
              borderRadius="$7"
              backgroundColor={"$blue11Light"}
              padding="$1"
              borderColor="white"
              borderWidth="$1"
            >
              <MaterialIcons name="edit" size={18} color="white" />
            </View>
          </Pressable>
        </YStack>
        <YStack alignItems="center">
          <Text fontSize="$7" fontWeight="bold">
            Monica Geller
          </Text>
          <Text color="gray">moncat</Text>
        </YStack>
        <Button
          onPress={() => router.push("/account/profile")}
          marginTop="$2"
          color="$red9Light"
        >
          View my profile
        </Button>
      </YStack>
    </LinearGradient>
  );
}
