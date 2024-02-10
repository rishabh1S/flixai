import { PostsTab } from "@/src/components";
import { LinearGradient } from "@tamagui/linear-gradient";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Label, View, XStack } from "tamagui";

export default function SaveScreen() {
  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <SafeAreaView style={{ marginBottom: 5 }}>
        <XStack
          alignItems="center"
          justifyContent="space-between"
          marginHorizontal="$3"
        >
          <Avatar circular size={"$3"}>
            <Avatar.Image
              accessibilityLabel="Cam"
              src={
                "https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              }
            />
            <Avatar.Fallback backgroundColor="$red10" />
          </Avatar>
          <Label fontSize={"$7"}>My Library</Label>
          <View></View>
        </XStack>
      </SafeAreaView>
      <PostsTab showOptions={false} />
    </LinearGradient>
  );
}
