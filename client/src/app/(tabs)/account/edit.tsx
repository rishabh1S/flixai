import { View, Text, YStack, Avatar, Input, XStack, TextArea } from "tamagui";
import React, { useState } from "react";
import { LinearGradient } from "@tamagui/linear-gradient";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function EditScreen() {
  const [userProfileUri, setUserProfileUri] = useState(
    "https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
  );

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setUserProfileUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <YStack alignItems="center" marginVertical="$4" gap="$3">
        <Pressable onPress={pickImage}>
          <Avatar circular size={"$13"}>
            <Avatar.Image accessibilityLabel="Cam" src={userProfileUri} />
            <Avatar.Fallback backgroundColor="$red10" />
          </Avatar>
          <View
            position="absolute"
            bottom="$3"
            right="$2"
            borderRadius="$7"
            backgroundColor={"$color6"}
            padding={5}
            borderColor="white"
            borderWidth="$1"
          >
            <MaterialIcons
              name="enhance-photo-translate"
              size={24}
              color="white"
            />
          </View>
        </Pressable>
        <YStack alignItems="center">
          <Text fontSize="$7" fontWeight="bold">
            Monica Geller
          </Text>
          <Text color="$gray9">monica9913@gmail.com</Text>
        </YStack>
      </YStack>
      <YStack marginHorizontal="$3" marginTop="$7" gap="$7">
        <XStack alignItems="center" justifyContent="space-between">
          <Text>Username</Text>
          <Input
            flex={1}
            maxWidth={"75%"}
            size="$4"
            placeholder="moncat"
            cursorColor="white"
          />
        </XStack>
        <XStack alignItems="center" justifyContent="space-between">
          <Text>Bio</Text>
          <TextArea
            flex={1}
            rows={6}
            maxWidth={"75%"}
            size="$4"
            placeholder="Enter bio here..."
            cursorColor="white"
          />
        </XStack>
      </YStack>
    </LinearGradient>
  );
}
