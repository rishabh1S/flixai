import { LinearGradient } from "@tamagui/linear-gradient";
import React, { ReactElement } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Text, Label, View, YStack, Button, XStack } from "tamagui";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Pressable } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

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
      <YStack alignItems="center" gap="$2">
        <YStack alignItems="center">
          <Avatar circular size={"$10"}>
            <Avatar.Image
              accessibilityLabel="Cam"
              src={
                "https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              }
            />
            <Avatar.Fallback backgroundColor="$red10" />
          </Avatar>
          <Pressable onPress={() => router.push("/account/edit")}>
            <View
              marginTop="$-3"
              borderRadius="$7"
              backgroundColor={"$blue11Light"}
              padding="$1"
              borderColor="white"
              borderWidth="$1"
            >
              <MaterialIcons name="edit" size={18} color="white" />
            </View>
          </Pressable>
        </YStack>
        <YStack alignItems="center">
          <Text fontSize="$7" fontWeight="bold">
            Monica Geller
          </Text>
          <Text color="gray">moncat</Text>
        </YStack>
        <Button
          onPress={() => router.push("/account/profile")}
          marginTop="$2"
          color="$red9Light"
        >
          View my profile
        </Button>
      </YStack>
      <YStack marginTop="$11">
        <ActionButton
          icon={<AntDesign name="edit" size={28} color="#E5484D" />}
          title="Edit Profile"
          onPress={() => router.push("/account/edit")}
        />
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
