import React, { useState } from "react";
import { View, XStack, Text, Label, Button } from "tamagui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

interface NumberStepperProps {
  min: number;
  max: number;
}
const NumberStepper: React.FC<NumberStepperProps> = ({ min, max }) => {
  const [value, setValue] = useState(min);
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
        <Button
          size="$2"
          onPress={() => {
            if (value > min) {
              setValue(value - 1);
            }
          }}
        >
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
        <Button
          size="$2"
          onPress={() => {
            if (value < max) {
              setValue(value + 1);
            }
          }}
        >
          <AntDesign name="plus" size={18} color="white" />
        </Button>
      </XStack>
    </XStack>
  );
};

export default NumberStepper;
