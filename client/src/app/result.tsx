import {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  Share,
  TouchableOpacity,
} from "react-native";
import ImageView from "react-native-image-viewing";
import Carousel from "react-native-reanimated-carousel";
import {
  Button,
  Card,
  Image,
  Label,
  ScrollView,
  TextArea,
  View,
  XStack,
  YStack,
} from "tamagui";
import { useGlobalContext } from "@/src/context/GlobalContext";
var { width, height } = Dimensions.get("window");
import Toast from "react-native-simple-toast";
import { Alerts } from "@/src/components";
import { createPost } from "@/api";
import { useUserContext } from "../context/UserContext";

interface DotIndicatorProps {
  totalDots: number;
  activeIndex: number;
}

interface ResultItemProps {
  item: string;
  onPress: () => void;
}

const DotIndicator: React.FC<DotIndicatorProps> = ({
  totalDots,
  activeIndex,
}) => (
  <XStack justifyContent="center" gap="$2">
    {Array.from({ length: totalDots }).map((_, index) => (
      <View
        key={index}
        width={8}
        height={8}
        borderRadius="$10"
        backgroundColor={index === activeIndex ? "$red10Light" : "gray"}
      />
    ))}
  </XStack>
);

const ResultItem: React.FC<ResultItemProps> = ({ item, onPress }) => {
  const { prompt } = useGlobalContext();
  const { username, userAvatar } = useUserContext();

  const handleDownload = async () => {
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

  const handlePublish = async () => {
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

  return (
    <Pressable onPress={onPress}>
      <YStack gap="$2">
        <Card elevate overflow="hidden">
          <Image source={{ uri: item }} style={{ aspectRatio: 1 / 1.2 }} />
        </Card>
        <XStack
          theme={"red"}
          gap="$4"
          justifyContent="center"
          marginVertical="$2"
        >
          <Button
            iconAfter={<Feather name="download" size={24} color="white" />}
            size="$3"
            onPress={handleDownload}
          >
            Download
          </Button>
          <Alerts
            title="Share your Creation"
            content="This will make your creation and prompt publicly visible on the Explore Feed."
            btnText="Post"
            actionBtnText="Post"
            action={handlePublish}
          />
          <Button
            iconAfter={
              <MaterialCommunityIcons
                name="share-outline"
                size={24}
                color="white"
              />
            }
            onPress={() =>
              Share.share({
                message: `Check out this amazing image generated with FlixAi! 🚀✨\n\n${item}\n\nDownload the app now to create your own unique images: [Your App Download Link]`,
              })
            }
            size="$3"
          >
            Share
          </Button>
        </XStack>
      </YStack>
    </Pressable>
  );
};

export default function result() {
  const { generatedImages, prompt } = useGlobalContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  const openImageView = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
    setIsImageViewVisible(true);
  };

  const ImageViewFooter = (
    <XStack marginVertical="$4" justifyContent="center" gap="$4">
      <Pressable
        style={{ backgroundColor: "#211", padding: 10, borderRadius: 25 }}
      >
        <Feather name="download" size={28} color="white" />
      </Pressable>
      <Pressable
        style={{ backgroundColor: "#211", padding: 10, borderRadius: 25 }}
      >
        <MaterialCommunityIcons name="share-outline" size={28} color="white" />
      </Pressable>
    </XStack>
  );

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <ScrollView
        flex={1}
        marginHorizontal="$3"
        showsVerticalScrollIndicator={false}
      >
        <YStack>
          {generatedImages.length > 1 ? (
            <Carousel
              data={generatedImages}
              renderItem={({ item, index }) => (
                <ResultItem item={item} onPress={() => openImageView(index)} />
              )}
              width={width * 0.93}
              height={height * 0.6}
              pagingEnabled
              onSnapToItem={(index) => setActiveIndex(index)}
            />
          ) : (
            <ResultItem
              item={generatedImages[0]}
              onPress={() => openImageView(0)}
            />
          )}
          <View marginTop="$2">
            {generatedImages.length > 1 && (
              <DotIndicator
                totalDots={generatedImages.length}
                activeIndex={activeIndex}
              />
            )}
          </View>
        </YStack>
        <YStack paddingBottom="$10">
          <Label fontSize="$7">Prompt</Label>
          <TextArea
            theme={"red"}
            borderWidth={1}
            rows={5}
            value={prompt}
            editable={false}
          />
          <TouchableOpacity
            onPress={async () => {
              await Clipboard.setStringAsync(prompt);
              Haptics.selectionAsync();
            }}
          >
            <MaterialIcons
              name="content-copy"
              size={24}
              color="#CD2B31"
              style={{ position: "absolute", bottom: 8, right: 8 }}
            />
          </TouchableOpacity>
        </YStack>
      </ScrollView>
      <ImageView
        images={generatedImages.map((uri) => ({ uri }))}
        imageIndex={activeIndex}
        visible={isImageViewVisible}
        onRequestClose={() => setIsImageViewVisible(false)}
        FooterComponent={() => ImageViewFooter}
      />
    </LinearGradient>
  );
}
