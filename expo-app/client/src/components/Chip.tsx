import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ChipProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}
const Chip: React.FC<ChipProps> = ({ title, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          { backgroundColor: selected ? "#F2555A" : "transparent" },
        ]}
      >
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    borderColor: "#F2555A",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 2,
  },
  text: {
    color: "#f0f0f0",
    fontSize: 18,
    fontWeight: "bold",
  },
});
