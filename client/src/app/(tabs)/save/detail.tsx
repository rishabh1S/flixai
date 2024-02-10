import React from "react";
import { LinearGradient } from "@tamagui/linear-gradient";
import { Text } from "tamagui";

export default function DetailScreen() {
  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <Text>For Tommorow</Text>
    </LinearGradient>
  );
}
