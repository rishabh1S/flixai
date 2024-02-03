import { router } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Image,
  Label,
  ScrollView,
  TextArea,
  Text,
  View,
  XStack,
  YStack,
  Switch,
} from "tamagui";
import { LinearGradient } from "@tamagui/linear-gradient";
import { Accordians, Cards, Chip, NumberStepper } from "@/src/components";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const aspectRatios = [
  { title: "1:1", resolution: "1024x1024" },
  { title: "3:5", resolution: "768x1280" },
  { title: "9:7", resolution: "1152x896" },
  { title: "18:9", resolution: "1408x704" },
  { title: "5:2", resolution: "1600x640" },
];

export default function GenerateScreen() {
  const [prompt, setPrompt] = useState("");
  const [selectedResolution, setSelectedResolution] = useState(aspectRatios[2]);
  const [imageQuality, setImageQuality] = useState("Speed");
  const [imageNumber, setImageNumber] = useState(1);
  const [selectedPreset, setSelectedPreset] = useState("Default");

  // Advanced
  const [negativePrompt, setNegativePrompt] = useState("");
  const [imageSeed, setImageSeed] = useState("-1");
  const [sharpness, setSharpness] = useState(2);
  const [guidanceScale, setGuidanceScale] = useState(4);
  const [refinerSwitch, setRefinerSwitch] = useState(0.5);

  const isValidPrompt = prompt
    .trim()
    .split(/\s+/)
    .some((word) => word.length > 1);

  const handleGenerate = () => {
    if (!isValidPrompt) {
      Alert.alert(
        "Error",
        "The prompt cannot be empty, enter something meaningful."
      );
      return;
    }
    router.push({
      pathname: "/resultModal",
      params: {
        prompt,
        resolution: selectedResolution.resolution,
        imageQuality,
        imageNumber,
        selectedPreset,
        negativePrompt,
        imageSeed,
        sharpness,
        guidanceScale,
        refinerSwitch,
      },
    });
  };

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <SafeAreaView style={{ marginBottom: 10 }}>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginHorizontal={16}
          marginVertical={8}
        >
          <View>
            <Image
              flex={1}
              width={100}
              source={require("../../../assets/images/logo.png")}
            />
          </View>
          <TouchableOpacity onPress={() => router.replace("/")}>
            <AntDesign name="message1" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View marginHorizontal="$2.5">
          <View flexDirection="row" alignItems="center" gap="$2">
            <Label size="$5">Enter your prompt</Label>
            <Feather name="info" size={18} color="blue" />
          </View>
          <TextArea
            cursorColor="white"
            size="$5"
            rows={6}
            borderWidth={1}
            placeholder="Dragon in the vivid futuristic city..."
            value={prompt}
            onChangeText={setPrompt}
          />
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 60,
          flexGrow: 1,
        }}
      >
        <YStack marginHorizontal="$2.5" marginBottom="$3" gap="$2">
          <Label fontSize="$7">Aspect Ratio</Label>
          <XStack justifyContent="space-between">
            {aspectRatios.map((aspectRatio) => (
              <Chip
                key={aspectRatio.title}
                title={aspectRatio.title}
                selected={selectedResolution === aspectRatio}
                onPress={() => setSelectedResolution(aspectRatio)}
              />
            ))}
          </XStack>
        </YStack>
        <XStack
          marginHorizontal="$2.5"
          marginBottom="$3"
          alignItems="center"
          justifyContent="space-between"
        >
          <YStack>
            <XStack alignItems="center">
              <Label fontSize="$7">Image Quality </Label>
              <MaterialIcons name="hd" size={20} color="white" />
            </XStack>
            <Text color="gray" marginTop="$-2" fontSize="$1">
              Get Image in High Resoltion
            </Text>
          </YStack>
          <Switch
            size="$2"
            theme="red"
            onCheckedChange={(value) =>
              setImageQuality(value ? "Quality" : "Speed")
            }
            value={imageQuality}
          >
            <Switch.Thumb animation="bouncy" />
          </Switch>
        </XStack>
        <NumberStepper
          min={1}
          max={8}
          value={imageNumber}
          onDecrease={() =>
            setImageNumber((prevValue) => Math.max(prevValue - 1, 1))
          }
          onIncrease={() =>
            setImageNumber((prevValue) => Math.min(prevValue + 1, 8))
          }
        />
        <YStack marginHorizontal="$2.5" marginBottom="$0.5">
          <Label fontSize="$7" marginBottom="$1">
            Choose Preset
          </Label>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Cards
              title="Default"
              uri="https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910913/FlixAi/default-sample.png"
              selected={selectedPreset === "Default"}
              onPress={() => setSelectedPreset("Default")}
            />
            <Cards
              title="Realistic"
              uri="https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910913/FlixAi/realistic-sample.png"
              selected={selectedPreset === "Realistic"}
              onPress={() => setSelectedPreset("Realistic")}
            />
            <Cards
              title="Anime"
              uri="https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910914/FlixAi/anime-sample.png"
              selected={selectedPreset === "Anime"}
              onPress={() => setSelectedPreset("Anime")}
            />
          </ScrollView>
        </YStack>
        <YStack marginVertical="$2.5">
          <Accordians
            negativePrompt={negativePrompt}
            setNegativePrompt={setNegativePrompt}
            imageSeed={imageSeed}
            setImageSeed={setImageSeed}
            sharpness={sharpness}
            setSharpness={setSharpness}
            guidanceScale={guidanceScale}
            setGuidanceScale={setGuidanceScale}
            refinerSwitch={refinerSwitch}
            setRefinerSwitch={setRefinerSwitch}
          />
        </YStack>
        <View flex={1} justifyContent="flex-end" marginBottom="$2">
          <Button
            backgroundColor="$red11Dark"
            borderRadius="$6"
            marginHorizontal="$2.5"
            onPress={handleGenerate}
          >
            Generate
            <MaterialCommunityIcons
              name="star-four-points-outline"
              size={24}
              color="white"
            />
          </Button>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
