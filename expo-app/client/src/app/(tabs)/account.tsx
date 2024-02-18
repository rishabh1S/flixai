import Alerts from "@/src/components/Alerts";
import { useUserContext } from "@/src/context/UserContext";
import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { ReactElement, useRef, useState } from "react";
import { Pressable } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Input, Label, Text, View, XStack, YStack } from "tamagui";

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
  const { userAvatar, username, name, email, updateUsername } =
    useUserContext();
  const [newUsername, setNewUsername] = useState<string>(username!);
  const refRBSheet = useRef<RBSheet>(null);

  const Logout = async () => {
    try {
      await signOut();
      router.push("/landing");
    } catch (error) {
      console.error("Error signing out the current user: ", error);
    }
  };
  const deleteAccount = async () => {
    try {
      await user?.delete();
      router.push("/landing");
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

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
            <Avatar.Image accessibilityLabel="Cam" src={userAvatar} />
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
          <XStack gap="$2">
            <Text color="$gray11">@{username}</Text>
            <Pressable onPress={() => refRBSheet.current?.open()}>
              <Feather name="edit-3" size={16} color="white" />
            </Pressable>
          </XStack>
          {/* @ts-ignore */}
          <RBSheet
            ref={refRBSheet}
            height={170}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
              wrapper: {
                backgroundColor: "rgba(0,0,0,0.7)",
              },
              container: {
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                backgroundColor: "rgb(22, 22, 22)",
              },
              draggableIcon: {
                display: "none",
              },
            }}
          >
            <YStack gap="$2" paddingHorizontal="$5" paddingVertical="$3.5">
              <Label fontSize="$5">Enter your Username</Label>
              <Input
                value={newUsername}
                onChangeText={(username) => setNewUsername(username)}
                placeholder="Enter new username"
                cursorColor="white"
              />
              <XStack
                gap="$5"
                justifyContent="flex-end"
                paddingHorizontal="$2.5"
                paddingTop="$2"
              >
                <Pressable
                  onPress={() => {
                    refRBSheet.current?.close();
                  }}
                >
                  <Text>Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={async () => {
                    if (updateUsername) {
                      await updateUsername(newUsername);
                      refRBSheet.current?.close();
                    }
                  }}
                >
                  <Text>Save</Text>
                </Pressable>
              </XStack>
            </YStack>
          </RBSheet>
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
          onPress={() => Logout()}
          icon={<MaterialIcons name="logout" size={30} color="#FF6369" />}
          title="Logout"
        />
      </YStack>
      <YStack flex={1} justifyContent="flex-end" marginBottom="$10" gap="$2">
        <Alerts
          title="Confirm Account Deletion"
          content="This will permanently delete your account. This action cannot be undone are you sure?"
          btnText="Delete my account"
          actionBtnText="Delete"
          action={deleteAccount}
        />
        <Text textAlign="center" color="$color8" fontSize="$1">
          App Version 1.0.0
        </Text>
      </YStack>
    </LinearGradient>
  );
}
