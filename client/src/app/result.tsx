import { fetchPosts } from "@/api";
import { Alerts, ImageViewFooter, PostsLayout } from "@/src/components";
import { useGlobalContext } from "@/src/context/GlobalContext";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, TouchableOpacity } from "react-native";
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
import { useUserContext } from "../context/UserContext";
import { PostData } from "../utils/types";
import {
  handleDownload,
  handlePublish,
  handleShare,
} from "../utils/utilityFunctions";
var { width, height } = Dimensions.get("window");

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
            onPress={() => handleDownload(item)}
          >
            Download
          </Button>
          <Alerts
            title="Share your Creation"
            content="This will make your creation and prompt publicly visible on the Explore Feed."
            btnText="Post"
            actionBtnText="Post"
            action={() => handlePublish({ item, username, userAvatar, prompt })}
          />
          <Button
            iconAfter={
              <MaterialCommunityIcons
                name="share-outline"
                size={24}
                color="white"
              />
            }
            onPress={() => handleShare(item)}
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
  const [posts, setPosts] = useState<PostData[]>([]);

  const getPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const openImageView = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
    setIsImageViewVisible(true);
  };

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack marginHorizontal="$3">
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
        <YStack paddingBottom="$2" marginHorizontal="$3">
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
        <YStack marginVertical="$3">
          <Label marginHorizontal="$3" fontSize="$7">
            More from Community
          </Label>
          <PostsLayout posts={posts} />
        </YStack>
      </ScrollView>
      <ImageView
        images={generatedImages.map((uri) => ({ uri }))}
        imageIndex={activeIndex}
        visible={isImageViewVisible}
        onRequestClose={() => setIsImageViewVisible(false)}
        FooterComponent={() => (
          <ImageViewFooter
            onDownload={() => handleDownload(generatedImages[activeIndex])}
            onShare={() => handleShare(generatedImages[activeIndex])}
          />
        )}
      />
    </LinearGradient>
  );
}
