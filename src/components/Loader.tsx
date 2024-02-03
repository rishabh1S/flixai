import { View, StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { Label } from "tamagui";

const Loader = () => {
  return (
    <View style={styles.container}>
      <Label fontSize="$10" padding="$2">
        We are Creating Your digital Art
      </Label>
      <LottieView
        source={require("../../assets/loader.json")}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 400,
    height: 400,
  },
});

export default Loader;
