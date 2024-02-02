import React from "react";
import { Label, YStack, Text } from "tamagui";
import Slider from "@react-native-community/slider";

interface SlidersProps {
  title: string;
  min: number;
  max: number;
  defaultValue: number;
}

const Sliders: React.FC<SlidersProps> = ({ title, min, max, defaultValue }) => {
  return (
    <YStack>
      <Label>{title}</Label>
      <Slider
        minimumValue={min}
        maximumValue={max}
        value={defaultValue}
        minimumTrackTintColor="#CD2B31"
        maximumTrackTintColor="red"
        thumbTintColor="#EB9091"
      />
      <Text color="gray" fontSize="$2">
        {`Default: ${defaultValue}`}
      </Text>
    </YStack>
  );
};

export default Sliders;
