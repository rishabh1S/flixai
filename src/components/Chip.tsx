import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface ChipProps {
  title: string;
}
const Chip: React.FC<ChipProps> = ({ title }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    borderColor: "#EB9091",
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
