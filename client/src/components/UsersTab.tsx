import { Dimensions, RefreshControl, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Avatar, View, XStack, YStack, Text, Button, Image } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { dummyImages } from "../constants/data";

const width = Dimensions.get("window").width;

const UsersTab = () => {
  const [refreshing, setRefreshing] = useState(false);
  const data = Array.from({ length: 12 }, (_, index) => index + 1);

  const renderItem = () => {
    return (
      <TouchableOpacity>
        <View padding="$3.5">
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
                    1200
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
        <XStack>
          {dummyImages.map((source, index) => (
            <Image
              key={index}
              source={{
                uri: source,
                width: width * 0.333,
                height: width * 0.33,
              }}
            />
          ))}
        </XStack>
      </TouchableOpacity>
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <FlashList
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#ffffff"]}
          progressBackgroundColor="#111"
        />
      }
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      estimatedItemSize={250}
    />
  );
};

export default UsersTab;
