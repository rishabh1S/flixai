import { generateImage } from "@/api/index";
import {
  Accordians,
  Cards,
  Chip,
  Headers,
  Loader,
  NumberStepper,
} from "@/src/components";
import { aspectRatios, presetData } from "@/src/constants/data";
import { defaultValues } from "@/src/constants/default";
import { randomPrompts } from "@/src/constants/randomPrompts";
import { useImageContext } from "@/src/context/ImageContext";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Label,
  ScrollView,
  Switch,
  Text,
  TextArea,
  View,
  XStack,
  YStack,
} from "tamagui";

export default function GenerateScreen() {
  const { updateGeneratedImages, updatePrompt } = useImageContext();
  const [prompt, setPrompt] = useState("");
  const [selectedResolution, setSelectedResolution] = useState(aspectRatios[3]);
  const [imageQuality, setImageQuality] = useState("Speed");
  const [imageNumber, setImageNumber] = useState(1);
  const [selectedPreset, setSelectedPreset] = useState("Default");

  // Advanced

  const [cnImage, setCnImage] = useState<string | undefined>();
  const [cnType, setCnType] = useState("ImagePrompt");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [styleSelections, setStyleSelections] = useState("");
  const [imageSeed, setImageSeed] = useState(-1);
  const [sharpness, setSharpness] = useState(2);
  const [guidanceScale, setGuidanceScale] = useState(4);
  const [refinerSwitch, setRefinerSwitch] = useState(0.5);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const presetDefaults = defaultValues[selectedPreset];
    setNegativePrompt(presetDefaults.negative_prompt);
    setStyleSelections(presetDefaults.style_selections);
    setGuidanceScale(presetDefaults.guidance_scale);
    setRefinerSwitch(presetDefaults.refiner_switch);
  }, [selectedPreset]);

  const isValidPrompt = prompt
    .trim()
    .split(/\s+/)
    .some((word) => word.length > 1);

  const handleSurpriseMeClick = () => {
    const randomPrompt =
      randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    setPrompt(randomPrompt);
  };

  const handleGenerate = async () => {
    if (!isValidPrompt) {
      Alert.alert(
        "Error",
        "The prompt cannot be empty, enter something meaningful."
      );
      return;
    }

    setIsLoading(true);

    const params = {
      prompt,
      selectedPreset,
      selectedResolution,
      imageQuality,
      imageNumber,
      negativePrompt,
      imageSeed,
      sharpness,
      guidanceScale,
      refinerSwitch,
      styleSelections,
      cnImage,
      cnType,
    };

    try {
      const response = await generateImage(params);
      updateGeneratedImages(response.output);
      updatePrompt(prompt);
      router.push("/resultModal");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SafeAreaView style={{ marginBottom: 15 }}>
            <Headers />
            <View marginHorizontal="$2.5">
              <View
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                gap="$2"
                marginHorizontal="$1"
              >
                <Label size="$5">Enter your prompt</Label>
                <Button
                  onPress={handleSurpriseMeClick}
                  theme="red"
                  iconAfter={
                    <FontAwesome5 name="lightbulb" size={14} color="yellow" />
                  }
                  size="$2"
                  borderRadius="$4"
                >
                  <Text>Surprise Me</Text>
                </Button>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack marginHorizontal="$2.5" marginBottom="$3" gap="$2.5">
              <YStack>
                <Label fontSize="$7">Aspect Ratios</Label>
                <Text color="gray" marginTop="$-2" fontSize="$1">
                  width x height
                </Text>
              </YStack>
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
              <XStack>
                {presetData.map((preset) => (
                  <Cards
                    key={preset.key}
                    title={preset.title}
                    uri={preset.uri}
                    selected={selectedPreset === preset.key}
                    onPress={() => setSelectedPreset(preset.key)}
                  />
                ))}
              </XStack>
            </YStack>
            <YStack marginVertical="$2.5">
              <Accordians
                negativePrompt={negativePrompt}
                setNegativePrompt={setNegativePrompt}
                imageSeed={imageSeed}
                setImageSeed={setImageSeed}
                setSharpness={setSharpness}
                cnImage={cnImage}
                setCnImage={setCnImage}
                setCnType={setCnType}
              />
            </YStack>
          </ScrollView>
          <View justifyContent="flex-end" paddingTop="$2" paddingBottom={65}>
            <Button
              backgroundColor="$red10Dark"
              theme="red"
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
        </>
      )}
    </LinearGradient>
  );
}
