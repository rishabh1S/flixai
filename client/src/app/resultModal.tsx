import {
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
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
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Card,
  Image,
  Label,
  ScrollView,
  Text,
  TextArea,
  View,
  XStack,
  YStack,
} from "tamagui";
import { useImageContext } from "../context/ImageContext";
var { width, height } = Dimensions.get("window");
import Toast from "react-native-simple-toast";
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

  return (
    <Pressable onPress={onPress}>
      <YStack gap="$2">
        <Card elevate overflow="hidden">
          <Image source={{ uri: item }} style={{ aspectRatio: 9 / 13 }} />
        </Card>
        <XStack
          theme={"red"}
          gap="$4"
          justifyContent="center"
          marginVertical="$2"
        >
          <Button
            iconAfter={<Octicons name="download" size={24} color="white" />}
            size="$3"
            onPress={handleDownload}
          >
            Download
          </Button>
          <Button
            iconAfter={<MaterialIcons name="publish" size={24} color="white" />}
            size="$3"
          >
            Post
          </Button>
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

export default function resultModal() {
  const { generatedImages, prompt } = useImageContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  const openImageView = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
    setIsImageViewVisible(true);
  };

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <SafeAreaView
        style={{
          marginBottom: 8,
        }}
      >
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={8}
          paddingHorizontal="$4"
        >
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="keyboard-backspace" size={26} color="white" />
          </TouchableOpacity>
          <Text fontSize="$7" marginLeft="$-3.5">
            Result
          </Text>
          <View />
        </View>
        <YStack marginHorizontal="$3">
          {generatedImages.length > 1 ? (
            <Carousel
              data={generatedImages}
              renderItem={({ item, index }) => (
                <ResultItem item={item} onPress={() => openImageView(index)} />
              )}
              width={width * 0.93}
              height={height * 0.7}
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
      </SafeAreaView>
      <ScrollView
        marginHorizontal="$3"
        marginBottom="$3"
        showsVerticalScrollIndicator={false}
      >
        <YStack>
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
        <ImageView
          images={generatedImages.map((uri) => ({ uri }))}
          imageIndex={activeIndex}
          visible={isImageViewVisible}
          onRequestClose={() => setIsImageViewVisible(false)}
        />
      </ScrollView>
    </LinearGradient>
  );
}
