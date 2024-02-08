import { LinearGradient } from "@tamagui/linear-gradient";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CreatorList, Headers, PostList } from "@/src/components";
import { ScrollView, Text, YStack } from "tamagui";
import { Pressable } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <SafeAreaView style={{ marginBottom: 15 }}>
        <Headers />
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} marginBottom="$7">
        <YStack gap="$2" marginHorizontal="$2" paddingHorizontal="$3">
          <Text fontSize={"$9"} fontWeight={"800"}>
            Unleash Your{" "}
            <Text color={"$red10Dark"} fontWeight={"800"}>
              Imagination
            </Text>{" "}
            with Flix{" "}
            <Text color={"$red10Dark"} fontWeight={"800"}>
              AI
            </Text>
          </Text>
          <Text color={"$gray10Light"} fontSize={"$3"}>
            Flix AI is your creative hub for effortless image generation.
            Create, share and connect with fellow users in a seamless experience
            powered by the cutting-edge Fooocus API.
          </Text>
          <Pressable onPress={() => router.navigate("/generate")}>
            <LinearGradient
              marginTop="$2"
              padding="$2.5"
              alignSelf="flex-start"
              colors={["$red9Dark", "$red8Light"]}
              borderRadius={"$8"}
            >
              <Text>Start Creating for Free</Text>
            </LinearGradient>
          </Pressable>
        </YStack>
        <YStack gap="$5" marginVertical="$4">
          <PostList />
          <CreatorList />
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
}
