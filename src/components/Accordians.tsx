import React from "react";
import {
  Accordion,
  View,
  Text,
  Square,
  Label,
  TextArea,
  Input,
  YStack,
} from "tamagui";
import { Feather } from "@expo/vector-icons";
import Sliders from "./Sliders";

interface AccordiansProps {
  negativePrompt: string;
  setNegativePrompt: React.Dispatch<React.SetStateAction<string>>;
  imageSeed: string;
  setImageSeed: React.Dispatch<React.SetStateAction<string>>;
  sharpness: number;
  setSharpness: React.Dispatch<React.SetStateAction<number>>;
  guidanceScale: number;
  setGuidanceScale: React.Dispatch<React.SetStateAction<number>>;
  refinerSwitch: number;
  setRefinerSwitch: React.Dispatch<React.SetStateAction<number>>;
}

const Accordians: React.FC<AccordiansProps> = ({
  negativePrompt,
  setNegativePrompt,
  imageSeed,
  setImageSeed,
  sharpness,
  setSharpness,
  guidanceScale,
  setGuidanceScale,
  refinerSwitch,
  setRefinerSwitch,
}) => {
  return (
    <Accordion overflow="hidden" type="multiple" theme="red">
      <Accordion.Item value="a1">
        <Accordion.Trigger
          flexDirection="row"
          justifyContent="space-between"
          backgroundColor="$colorTransparent"
          borderWidth="$0"
        >
          {({ open }: any) => (
            <>
              <View flexDirection="row" alignItems="center" gap="$3">
                <Feather name="settings" size={22} color="white" />
                <Text>Advance Settings</Text>
              </View>
              <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                <Feather name="chevron-down" size={26} color="white" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.Content
          backgroundColor="$colorTransparent"
          marginTop="$-4.5"
          flexDirection="column"
        >
          <YStack>
            <View flexDirection="row" alignItems="center" gap="$2">
              <Label>Negative prompt</Label>
              <Feather name="info" size={18} color="red" />
            </View>
            <TextArea
              cursorColor="white"
              size="$5"
              rows={4}
              borderWidth={1}
              placeholder="unrealistic, saturated, watermark..."
              value={negativePrompt}
              onChangeText={setNegativePrompt}
            />
          </YStack>
          <YStack>
            <Label>Image Seed</Label>
            <Input
              cursorColor="white"
              flex={1}
              size="$4"
              placeholder="-1"
              value={imageSeed}
              onChangeText={setImageSeed}
            />
            <Text color="gray" fontSize="$2">
              Seed to generate image, -1 for random
            </Text>
          </YStack>
          <Sliders
            title="Sharpness"
            min={0}
            max={30}
            step={1}
            defaultValue={2}
            onValueChange={setSharpness}
          />
          <Sliders
            title="Guidance Scale"
            min={1}
            max={30}
            step={1}
            defaultValue={4}
            onValueChange={setGuidanceScale}
          />
          <Sliders
            title="Refiner Switch"
            min={0.1}
            max={1}
            step={0.01}
            defaultValue={0.5}
            onValueChange={setRefinerSwitch}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default Accordians;
