import React, { useState } from "react";
import { LinearGradient } from "@tamagui/linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  Card,
  Button,
  XStack,
  YStack,
  TextArea,
  Label,
  ScrollView,
} from "tamagui";
import { Dimensions, TouchableOpacity } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import { useImageContext } from "../context/ImageContext";
import Carousel from "react-native-reanimated-carousel";

var { width, height } = Dimensions.get("window");

interface DotIndicatorProps {
  totalDots: number;
  activeIndex: number;
}

export default function resultModal() {
  const { generatedImages, prompt } = useImageContext();
  const [activeIndex, setActiveIndex] = useState(0);

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
      </SafeAreaView>
      <ScrollView
        gap="$2"
        marginHorizontal="$3"
        showsVerticalScrollIndicator={false}
      >
        <Carousel
          data={generatedImages}
          renderItem={({ item }) => (
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
                  iconAfter={
                    <Octicons name="download" size={24} color="white" />
                  }
                  size="$3"
                >
                  Download
                </Button>
                <Button
                  iconAfter={
                    <MaterialIcons name="publish" size={24} color="white" />
                  }
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
                  size="$3"
                >
                  Share
                </Button>
              </XStack>
            </YStack>
          )}
          width={width * 0.94}
          height={height * 0.7}
          pagingEnabled
          onSnapToItem={(index) => setActiveIndex(index)}
        />
        <YStack marginTop="$2">
          <DotIndicator
            totalDots={generatedImages.length}
            activeIndex={activeIndex}
          />
          <Label fontSize="$7">Prompt</Label>
          <TextArea
            theme={"red"}
            size="$5"
            borderWidth={1}
            rows={5}
            placeholder={prompt}
            disabled
          />
          <TouchableOpacity
            onPress={async () => await Clipboard.setStringAsync(prompt)}
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
    </LinearGradient>
  );
}
