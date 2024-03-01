import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Button, Label, Text, View, XStack } from "tamagui";

interface NumberStepperProps {
  min: number;
  max: number;
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}
const NumberStepper: React.FC<NumberStepperProps> = ({
  min,
  max,
  value,
  onDecrease,
  onIncrease,
}) => {
  return (
    <XStack
      justifyContent="space-between"
      marginBottom="$2"
      marginHorizontal="$2.5"
      theme="red"
    >
      <XStack alignItems="center" gap="$3">
        <MaterialCommunityIcons
          name="image-filter-hdr"
          size={24}
          color="white"
        />
        <Label fontSize="$7">Images</Label>
      </XStack>
      <XStack alignItems="center" gap="$2">
        <Button size="$2" onPress={onDecrease}>
          <AntDesign name="minus" size={18} color="white" />
        </Button>
        <View
          backgroundColor="$red11Dark"
          paddingHorizontal="$2.5"
          paddingVertical="$1.5"
          borderRadius="$2"
        >
          <Text>{value}</Text>
        </View>
        <Button size="$2" onPress={onIncrease}>
          <AntDesign name="plus" size={18} color="white" />
        </Button>
      </XStack>
    </XStack>
  );
};

export default NumberStepper;
