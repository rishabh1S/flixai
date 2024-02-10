import {
  Text,
  XStack,
  Avatar,
  YStack,
  Label,
  Image,
  View,
  Button,
} from "tamagui";
import React, { useState } from "react";
import { dummyImages } from "../constants/data";
import { Dimensions, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";

const width = Dimensions.get("window").width;

interface ProfileProps {
  isSelf: boolean;
}

const Profile: React.FC<ProfileProps> = ({ isSelf }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const repeatedDummyImages = Array.from(
    { length: 8 },
    (_, index) => dummyImages
  ).flat();

  const renderGridItem = ({ item }: any) => (
    <Pressable
      onPress={() => router.push(isSelf ? "/account/post" : "/home/post")}
    >
      <Image
        source={{
          uri: item,
          width: width * 0.48,
          height: width * 0.4,
        }}
        style={{ margin: 2 }}
      />
    </Pressable>
  );

  return (
    <View minHeight="$2">
      <FlashList
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        ListHeaderComponent={() => (
          <YStack marginHorizontal="$5" marginVertical="$3">
            <XStack gap="$4" alignItems="center" justifyContent="space-between">
              <Avatar circular size="$9">
                <Avatar.Image
                  accessibilityLabel="Cam"
                  src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                />
                <Avatar.Fallback backgroundColor="$red10" />
              </Avatar>
              <XStack gap="$5">
                <YStack alignItems="center">
                  <Text textAlign="center" fontSize="$7" fontWeight={"bold"}>
                    22.3k
                  </Text>
                  <Text fontSize="$4">posts</Text>
                </YStack>
                <YStack alignItems="center">
                  <Text textAlign="center" fontSize="$7" fontWeight={"bold"}>
                    1200
                  </Text>
                  <Text fontSize="$4">followers</Text>
                </YStack>
                <YStack alignItems="center">
                  <Text textAlign="center" fontSize="$7" fontWeight={"bold"}>
                    12
                  </Text>
                  <Text fontSize="$4">following</Text>
                </YStack>
              </XStack>
            </XStack>
            <YStack>
              <Label fontSize="$7">moncat</Label>
              <Text color="$color10">
                Hi, I'm Monica. Yeah you heard it right, I am Monica Geller from
                famous sitcom Friends.
              </Text>
            </YStack>
            {!isSelf && (
              <Button
                onPress={() => setIsFollowed(!isFollowed)}
                marginVertical="$4"
                size="$3"
                backgroundColor={isFollowed ? "$gray2" : "$red9Dark"}
                theme="red"
              >
                {isFollowed ? "Following" : "Follow"}
              </Button>
            )}
          </YStack>
        )}
        data={repeatedDummyImages}
        renderItem={renderGridItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        estimatedItemSize={170}
      />
    </View>
  );
};

export default Profile;
