import { LinearGradient } from "@tamagui/linear-gradient";
import React, { ReactElement } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Text, Label, View, YStack, XStack } from "tamagui";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";

interface ActionButtonProps {
  icon: ReactElement;
  title: string;
  onPress?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  title,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    android_ripple={{ color: "rgba(255, 255, 255, 0.1)" }}
  >
    <XStack alignItems="center" paddingVertical="$2.5">
      <View paddingHorizontal="$5">{icon}</View>
      <Text fontSize="$7" marginLeft="$2" color="$color11">
        {title}
      </Text>
    </XStack>
  </Pressable>
);

export default function AccountScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const userProfileUri = user?.imageUrl;
  const username = user?.username;
  const name = user?.fullName;
  const email = user?.emailAddresses[0].emailAddress;

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        const base64 = `data:image/png;base64,${result.assets[0].base64}`;
        user?.setProfileImage({
          file: base64,
        });
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <SafeAreaView
        style={{
          marginBottom: 15,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Label fontSize={"$7"}>Account</Label>
      </SafeAreaView>
      <YStack alignItems="center" marginVertical="$2" gap="$3">
        <Pressable onPress={pickImage}>
          <Avatar circular size={"$12"}>
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
              size={18}
              color="white"
            />
          </View>
        </Pressable>
        <YStack alignItems="center" gap="$1">
          <Text fontSize="$7" fontWeight="bold">
            {name}
          </Text>
          <Text color="$gray9">{email}</Text>
          <Text color="$gray11">@{username}</Text>
        </YStack>
      </YStack>
      <YStack marginTop="$15">
        <ActionButton
          icon={
            <Ionicons name="notifications-outline" size={28} color="#FF6369" />
          }
          title="Manage Notifications"
        />
        <ActionButton
          icon={<MaterialIcons name="help-outline" size={28} color="#FF6369" />}
          title="Need Help"
        />
        <ActionButton
          icon={<Feather name="star" size={28} color="#FF6369" />}
          title="Like us? Rate us!"
        />
        <ActionButton
          icon={
            <MaterialCommunityIcons
              name="share-outline"
              size={30}
              color="#FF6369"
            />
          }
          title="Share FlixAi"
        />
        <ActionButton
          onPress={() => {
            signOut();
            router.push("/landing");
          }}
          icon={<MaterialIcons name="logout" size={30} color="#FF6369" />}
          title="Logout"
        />
      </YStack>
      <YStack flex={1} justifyContent="flex-end" marginBottom="$11" gap="$2">
        <Pressable>
          <Text color="$red11Light" textAlign="center">
            Delete my account
          </Text>
        </Pressable>
        <Text textAlign="center" color="$color9" fontSize="$1">
          App Version 0.5.0 (beta)
        </Text>
      </YStack>
    </LinearGradient>
  );
}