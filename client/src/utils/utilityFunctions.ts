import { Alert, Share } from "react-native";
import Toast from "react-native-simple-toast";
import * as MediaLibrary from "expo-media-library";
import { createPost } from "@/api";
import * as FileSystem from "expo-file-system";

export const handleDownload = async (item: string) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Please grant permission to save images."
      );
      return;
    }

    const res = await FileSystem.downloadAsync(
      item,
      `${FileSystem.documentDirectory}${item.split("/").pop()}`
    );
    await MediaLibrary.createAssetAsync(res.uri);
    Toast.show("Download complete ✅", Toast.BOTTOM);
  } catch (error) {
    Toast.show("Failed to save image. Please try again.", Toast.BOTTOM);
  }
};

export const handlePublish = async ({
  item,
  username,
  userAvatar,
  prompt,
}: any) => {
  try {
    const postData = {
      username,
      userAvatar,
      imageURL: item,
      prompt,
      createdAt: new Date(),
    };
    await createPost(postData);

    Toast.show("Posted successfully ✅", Toast.BOTTOM);
  } catch (error) {
    console.error("Failed to publish post:", error);
    Toast.show("Failed to publish post. Please try again.", Toast.BOTTOM);
  }
};

export const handleShare = (item: string) => {
  Share.share({
    message: `Check out this amazing image generated with FlixAi! 🚀✨\n\n${item}\n\nDownload the app now to create your own unique images: [App download link]`,
  });
};
