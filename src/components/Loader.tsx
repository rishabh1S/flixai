import { View, StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const Loader = () => {
  return (
    <View style={styles.container}>
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
