import React from "react";
import { LinearGradient } from "@tamagui/linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Headers } from "@/src/components";
import { Button, View } from "tamagui";
import { router } from "expo-router";

export default function LandingScreen() {
  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <SafeAreaView style={{ marginBottom: 15 }}>
        <Headers />
      </SafeAreaView>
      <View flex={1} justifyContent="center">
        <Button onPress={() => router.push("/home/")}>Let's Go</Button>
      </View>
    </LinearGradient>
  );
}
