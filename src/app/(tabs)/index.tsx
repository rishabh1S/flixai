import React, { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "@tamagui/linear-gradient";
import { aspectRatios, presetData } from "@/src/constants/data";
import {
  Button,
  Label,
  ScrollView,
  TextArea,
  Text,
  View,
  XStack,
  YStack,
  Switch,
} from "tamagui";
import {
  Accordians,
  Cards,
  Chip,
  Headers,
  Loader,
  NumberStepper,
} from "@/src/components";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import ResultModal from "@/src/components/ResultModal";
import { generateImage } from "@/api/index";

export default function GenerateScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [selectedResolution, setSelectedResolution] = useState(aspectRatios[2]);
  const [imageQuality, setImageQuality] = useState("Speed");
  const [imageNumber, setImageNumber] = useState(1);
  const [selectedPreset, setSelectedPreset] = useState("Default");

  // Advanced
  const [negativePrompt, setNegativePrompt] = useState("");
  const [imageSeed, setImageSeed] = useState(-1);
  const [sharpness, setSharpness] = useState(2);
  const [guidanceScale, setGuidanceScale] = useState(4);
  const [refinerSwitch, setRefinerSwitch] = useState(0.5);

  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");

  const isValidPrompt = prompt
    .trim()
    .split(/\s+/)
    .some((word) => word.length > 1);

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
      selectedResolution,
      imageQuality,
      imageNumber,
      negativePrompt,
      imageSeed,
      sharpness,
      guidanceScale,
      refinerSwitch,
    };

    try {
      const response = await generateImage({
        prompt,
        ...params,
      });
      setGeneratedImage(response.output[0]);
      setModalVisible(true);
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
          <SafeAreaView style={{ marginBottom: 10 }}>
            <Headers />
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
          <ResultModal
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            imageUrl={generatedImage}
            prompt={prompt}
          />
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
                {presetData.map((preset) => (
                  <Cards
                    key={preset.key}
                    title={preset.title}
                    uri={preset.uri}
                    selected={selectedPreset === preset.key}
                    onPress={() => setSelectedPreset(preset.key)}
                  />
                ))}
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
          </ScrollView>
        </>
      )}
    </LinearGradient>
  );
}
