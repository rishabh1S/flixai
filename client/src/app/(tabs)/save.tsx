import { LinearGradient } from "@tamagui/linear-gradient";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SaveScreen() {
  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <SafeAreaView style={{ marginBottom: 15 }}></SafeAreaView>
    </LinearGradient>
  );
}
