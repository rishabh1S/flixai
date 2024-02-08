import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, YStack, XStack, Card, H3, Avatar, Image, Label } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import Cards from "./Cards";
import { router } from "expo-router";

const PostList = () => {
  const data = Array.from({ length: 10 }, (_, index) => index + 1);

  const renderItem = () => {
    return (
      <Cards
        title="Abstract Portrait with light effects"
        uri="https://replicate.delivery/pbxt/ywrtFkWfAJRle06uDzNC5kgHxUlJbz9C7MwJ2iNGPJQvCuTSA/fee56087-4f97-4ca5-ac04-fd861071de7d.png"
        avataruri="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
        onPress={() => null}
        width={220}
        height={300}
        mr="$4"
      />
    );
  };
  return (
    <YStack gap="$2">
      <XStack
        justifyContent="space-between"
        alignItems="center"
        marginHorizontal="$4"
      >
        <Label fontWeight={"bold"} fontSize={"$7"}>
          Exploration
        </Label>
        <TouchableOpacity onPress={() => router.navigate("/explore")}>
          <Text color={"$red10Dark"}>See All</Text>
        </TouchableOpacity>
      </XStack>
      <FlashList
        horizontal
        removeClippedSubviews
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        estimatedItemSize={250}
      />
    </YStack>
  );
};

export default PostList;
