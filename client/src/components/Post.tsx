import { Text, Image, YStack, XStack, Label, Avatar } from "tamagui";
import React, { useRef, useState } from "react";
import { Dimensions, Pressable } from "react-native";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import ImageView from "react-native-image-viewing";
import {
  GestureHandlerRootView,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const width = Dimensions.get("window").width;

const Post = () => {
  const [isImageViewVisible, setImageViewVisible] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const tapState = useRef(0);

  const image = {
    uri: "https://replicate.delivery/pbxt/ywrtFkWfAJRle06uDzNC5kgHxUlJbz9C7MwJ2iNGPJQvCuTSA/fee56087-4f97-4ca5-ac04-fd861071de7d.png",
  };

  const opacity = useSharedValue(0);

  const handleTapStateChange = (event: { nativeEvent: { state: State } }) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      tapState.current += 1;
      if (tapState.current === 1) {
        setTimeout(() => {
          if (tapState.current === 1) {
            setImageViewVisible(true);
          }
          tapState.current = 0;
        }, 300);
      } else if (tapState.current === 2) {
        setShowHeart(true);
        opacity.value = withTiming(1, { duration: 300 });
        setTimeout(() => {
          setShowHeart(false);
          opacity.value = 0;
        }, 1000);
        tapState.current = 0;
      }
    }
  };

  const animatedHeartStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: withSpring(showHeart ? 1 : 0) }],
    };
  });

  return (
    <YStack>
      <XStack gap="$4" marginHorizontal="$3" paddingVertical="$3">
        <Avatar circular>
          <Avatar.Image
            accessibilityLabel="Cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback backgroundColor="$red10" />
        </Avatar>
        <Label fontSize="$5">moncat</Label>
      </XStack>
      <GestureHandlerRootView>
        <TapGestureHandler
          onHandlerStateChange={handleTapStateChange}
          numberOfTaps={1}
        >
          <Image
            source={{
              uri: "https://replicate.delivery/pbxt/ywrtFkWfAJRle06uDzNC5kgHxUlJbz9C7MwJ2iNGPJQvCuTSA/fee56087-4f97-4ca5-ac04-fd861071de7d.png",
              width: width,
              height: width,
            }}
          />
        </TapGestureHandler>
        {showHeart && (
          <XStack position="absolute" top="44%" left="44%">
            <Animated.View style={[animatedHeartStyle]}>
              <FontAwesome name="heart" size={60} color="white" />
            </Animated.View>
          </XStack>
        )}
      </GestureHandlerRootView>
      <XStack gap="$4" marginHorizontal="$3" paddingVertical="$2">
        <Feather name="heart" size={24} color="white" />
        <FontAwesome5
          name="comment"
          size={24}
          color="white"
          style={{ transform: [{ rotateY: "180deg" }] }}
        />
        <FontAwesome
          name="bookmark-o"
          size={24}
          color="white"
          style={{ marginLeft: "auto" }}
        />
      </XStack>
      <YStack marginHorizontal="$3">
        <Text>373 likes</Text>
        <XStack gap="$2" alignItems="flex-end">
          <Text fontWeight="bold">moncat</Text>
          <Text fontSize="$3">A house located near mountains</Text>
        </XStack>
        <Text color="$gray8">View all 166 comments</Text>
        <Text fontSize="$2" color="$gray9">
          4 hours ago
        </Text>
      </YStack>
      <ImageView
        images={[image]}
        imageIndex={0}
        visible={isImageViewVisible}
        onRequestClose={() => setImageViewVisible(false)}
      />
    </YStack>
  );
};

export default Post;
