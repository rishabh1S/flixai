import { Alert, Share } from "react-native";
import Toast from "react-native-simple-toast";
import * as MediaLibrary from "expo-media-library";
import { createPost } from "@/api";
import * as FileSystem from "expo-file-system";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

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

export const generateUsername = () => {
  const uniqueWords = [
    "zenith",
    "effervescent",
    "enigmatic",
    "quixotic",
    "ephemeral",
    "serendipity",
    "iridescent",
    "luminescent",
    "oblivion",
    "whimsical",
    "mellifluous",
    "resplendent",
    "ethereal",
    "sonder",
    "townsmart",
    "surreptitious",
    "efflorescence",
    "evanescent",
    "solitude",
    "quasar",
    "obfuscate",
    "sonorous",
    "paradox",
    "panacea",
    "labyrinthine",
    "magniloquent",
    "ephemeral",
    "nebulous",
    "serene",
    "idyllic",
    "ephemeral",
    "ubiquitous",
    "sibilant",
    "peregrinate",
  ];
  const randomWord =
    uniqueWords[Math.floor(Math.random() * uniqueWords.length)];
  const randomNumber = Math.floor(Math.random() * 90 + 10);

  return `${randomWord}${randomNumber}`;
};

export const getItemDimensions = (index: number) => {
  let itemWidth, itemHeight;
  index = index % 7;
  if (index === 0 || index === 3) {
    itemWidth = width * 0.595;
    itemHeight = height * 0.25;
  } else if (index === 1 || index === 2) {
    itemWidth = width * 0.395;
    itemHeight = height * 0.25;
  } else if (index === 4 || index === 5) {
    itemWidth = width * 0.495;
    itemHeight = width * 0.495;
  } else {
    itemWidth = width;
    itemHeight = height * 0.35;
  }

  return { itemWidth, itemHeight };
};

export const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
