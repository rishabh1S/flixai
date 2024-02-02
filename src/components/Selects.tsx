import React, { useMemo, useState } from "react";
import { Select, Adapt, Sheet } from "tamagui";
import { Feather } from "@expo/vector-icons";

interface SelectsProps {
  options: string[];
  value: string;
}

const Selects: React.FC<SelectsProps> = ({ options, value }) => {
  const [selectedValue, setSelectedValue] = useState(value);
  return (
    <Select
      value={selectedValue}
      onValueChange={(newValue) => {
        setSelectedValue(newValue);
      }}
    >
      <Select.Trigger
        iconAfter={<Feather name="chevron-down" size={26} color="white" />}
      >
        <Select.Value placeholder="Search..." />
      </Select.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Select.Content>
        <Select.Viewport minWidth={200}>
          <Select.Group>
            <Select.Label>Options</Select.Label>
            {useMemo(
              () =>
                options.map((option, index) => (
                  <Select.Item
                    key={index}
                    value={option}
                    index={index}
                    selected={option === selectedValue}
                  >
                    <Select.ItemText>{option}</Select.ItemText>
                    {option === selectedValue && (
                      <Select.ItemIndicator marginLeft="auto">
                        <Feather name="check" size={20} color="white" />
                      </Select.ItemIndicator>
                    )}
                  </Select.Item>
                )),
              [options, selectedValue]
            )}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
};

export default Selects;
