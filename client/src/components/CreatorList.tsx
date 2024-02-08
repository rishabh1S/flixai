import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { XStack, YStack, Text, Avatar, Button, View } from "tamagui";

const CreatorList = () => {
  const data = Array.from({ length: 3 }, (_, index) => index + 1);

  const renderItem = () => {
    return (
      <TouchableOpacity>
        <View
          marginBottom="$2.5"
          backgroundColor={"$red5Dark"}
          padding="$2"
          borderRadius={"$10"}
        >
          <XStack gap="$4" alignItems="center" justifyContent="space-between">
            <Avatar circular size="$6">
              <Avatar.Image
                accessibilityLabel="Cam"
                src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              />
              <Avatar.Fallback backgroundColor="$red10" />
            </Avatar>
            <YStack gap="$1.5">
              <Text fontWeight={"bold"} fontSize={"$6"}>
                Amara Sylamon
              </Text>
              <XStack gap="$3">
                <YStack gap="$-1.5">
                  <Text textAlign="center" fontWeight={"bold"}>
                    22.3k
                  </Text>
                  <Text fontSize={"$2"}>Posts</Text>
                </YStack>
                <YStack gap="$-1.5">
                  <Text textAlign="center" fontWeight={"bold"}>
                    1220k
                  </Text>
                  <Text fontSize={"$2"}>Followers</Text>
                </YStack>
                <YStack gap="$-1.5">
                  <Text textAlign="center" fontWeight={"bold"}>
                    12
                  </Text>
                  <Text fontSize={"$2"}>Following</Text>
                </YStack>
              </XStack>
            </YStack>
            <Button
              size="$2"
              borderRadius="$3"
              backgroundColor={"$red9Dark"}
              marginRight="$3"
              theme="red"
            >
              Follow
            </Button>
          </XStack>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <YStack gap="$3">
      <XStack
        justifyContent="space-between"
        alignItems="center"
        marginHorizontal="$4"
      >
        <Text fontWeight={"bold"} fontSize={"$7"}>
          Top Creators
        </Text>
        <TouchableOpacity onPress={() => router.navigate("/explore")}>
          <Text color={"$red10Dark"}>See All</Text>
        </TouchableOpacity>
      </XStack>
      <FlashList
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        estimatedItemSize={60}
      />
    </YStack>
  );
};

export default CreatorList;
