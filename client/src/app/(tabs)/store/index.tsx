import { LinearGradient } from "@tamagui/linear-gradient";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Headers, PostsTab } from "@/src/components";
import { Input, Text, XStack } from "tamagui";
import { AntDesign } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <SafeAreaView style={{ marginBottom: 10 }}>
        <Headers />
        <XStack
          marginHorizontal="$3"
          alignItems="center"
          marginVertical="$1.5"
          gap="$2"
        >
          <Input
            flex={1}
            size="$4"
            placeholder="Search"
            cursorColor={"white"}
            fontSize={"$3"}
            paddingLeft={"$7"}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          {searchText.length > 0 ? (
            <Pressable onPress={() => setSearchText("")}>
              <Text color={"$red10Dark"}>Cancel</Text>
            </Pressable>
          ) : null}
          <AntDesign
            name="search1"
            size={18}
            color="gray"
            style={{ position: "absolute", left: 10 }}
          />
        </XStack>
      </SafeAreaView>
      <PostsTab />
    </LinearGradient>
  );
}
