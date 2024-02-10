import React from "react";
import { LinearGradient } from "@tamagui/linear-gradient";
import { Post } from "@/src/components";
import { ScrollView } from "tamagui";

export default function PostScreen() {
  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Post />
        <Post />
        <Post />
      </ScrollView>
    </LinearGradient>
  );
}
