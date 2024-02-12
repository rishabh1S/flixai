import React, { useState } from "react";
import { LinearGradient } from "@tamagui/linear-gradient";
import { Button, Text, View, YStack, Image } from "tamagui";
import { router } from "expo-router";
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const DefaultScreen = ({ setIsDefault }: any) => {
  return (
    <YStack flex={1} justifyContent="flex-end" margin="$4" gap="$3">
      <Button
        theme="red"
        borderRadius="$8"
        backgroundColor="$red9"
        iconAfter={<AntDesign name="arrowright" size={24} color="white" />}
        onPress={() => setIsDefault(false)}
      >
        Continue
      </Button>
      <Text textAlign="center" fontSize="$1">
        By proceeding, you acknowledge that you have read, comprehended, and
        consented to our{" "}
        <Text textDecorationLine="underline" color="$red9">
          Terms of Services
        </Text>{" "}
        and{" "}
        <Text textDecorationLine="underline" color="$red9">
          Privacy Policy
        </Text>
        .
      </Text>
    </YStack>
  );
};

const LoginScreen = () => {
  return (
    <YStack flex={1} justifyContent="flex-end" margin="$4" gap="$3">
      <Button
        borderRadius="$8"
        size="$4.5"
        gap="$1.5"
        backgroundColor="$red6"
        theme="red"
      >
        <Image
          width={30}
          height={30}
          source={require("../../assets/images/google.png")}
        />
        <Text>Continue With Google</Text>
      </Button>
      <Button
        borderRadius="$8"
        size="$4.5"
        gap="$1.5"
        backgroundColor="$red6"
        theme="red"
      >
        <Image
          width={30}
          height={30}
          source={require("../../assets/images/github.png")}
        />
        <Text>Continue With Github</Text>
      </Button>
    </YStack>
  );
};

export default function LandingScreen() {
  const [isDefault, setIsDefault] = useState(true);

  return (
    <View backgroundColor="rgb(51, 17, 17)" flex={1}>
      <View className="absolute">
        <Image
          style={{ width, height: height * 0.85 }}
          source={require("../../assets/images/layout.jpg")}
        />
        <LinearGradient
          colors={[
            "transparent",
            "rgba(51, 17, 17, 0.7)",
            "rgba(51, 17, 17, 1)",
          ]}
          style={{ width, height: height * 0.2 }}
          position="absolute"
          bottom={0}
        />
        <Image
          width={150}
          height={50}
          source={require("../../assets/images/logo.png")}
          position="absolute"
          bottom={-10}
          left={width * 0.3}
        />
      </View>
      {isDefault ? (
        <DefaultScreen setIsDefault={setIsDefault} />
      ) : (
        <LoginScreen />
      )}
    </View>
  );
}
