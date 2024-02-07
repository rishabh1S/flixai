import React, { useEffect, useState } from "react";
import { Label, YStack, Text, XStack } from "tamagui";
import Slider from "@react-native-community/slider";

interface SlidersProps {
  title: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  onValueChange: (value: number) => void;
}

const Sliders: React.FC<SlidersProps> = ({
  title,
  min,
  max,
  step,
  defaultValue,
  onValueChange,
}) => {
  const [sliderValue, setSliderValue] = useState(defaultValue);

  useEffect(() => {
    setSliderValue(defaultValue);
  }, [defaultValue]);

  const handleValueChange = (value: number) => {
    setSliderValue(value);
    onValueChange(value);
  };

  return (
    <YStack>
      <XStack justifyContent="space-between" alignContent="center">
        <Label>{title}</Label>
        <Label color="gray">
          {sliderValue % 1 === 0
            ? sliderValue.toFixed(0)
            : sliderValue.toFixed(2)}
        </Label>
      </XStack>
      <Slider
        minimumValue={min}
        maximumValue={max}
        value={defaultValue}
        step={step}
        minimumTrackTintColor="#CD2B31"
        maximumTrackTintColor="red"
        thumbTintColor="#EB9091"
        onValueChange={handleValueChange}
      />
      <Text color="gray" fontSize="$2">
        {`Default: ${
          defaultValue % 1 === 0
            ? defaultValue.toFixed(0)
            : defaultValue.toFixed(2)
        }`}
      </Text>
    </YStack>
  );
};

export default Sliders;
