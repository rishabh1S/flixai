import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { Label } from "tamagui";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const Loader = () => {
  const fadeValue = useSharedValue(0);

  const fadeInOut = () => {
    fadeValue.value = withTiming(fadeValue.value === 0 ? 1 : 0, {
      duration: 1000,
    });
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      fadeInOut();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeValue.value,
    };
  });

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
      <Animated.View style={[animatedStyle]}>
        <Label fontSize="$8" padding="$2">
          Please stand by...
        </Label>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
    minHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.92)",
  },
  animation: {
    width: 400,
    height: 400,
  },
});

export default Loader;
