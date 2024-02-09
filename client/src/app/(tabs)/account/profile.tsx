import React from "react";
import { LinearGradient } from "@tamagui/linear-gradient";
import { Profile } from "@/src/components";
import { YStack } from "tamagui";
import { FlatList } from "react-native";

export default function ProfileScreen() {
  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <YStack paddingBottom={55}>
            <Profile isSelf={true} />
          </YStack>
        )}
        data={[]}
        renderItem={() => <></>}
        style={{ marginHorizontal: 2.5 }}
      />
    </LinearGradient>
  );
}
