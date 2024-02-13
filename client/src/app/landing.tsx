import { LinearGradient } from "@tamagui/linear-gradient";
import { Button, Text, View, YStack, Image, XStack, Label } from "tamagui";
import { Dimensions, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LoginPage, SignUpPage } from "@/src/components";
import { useCallback, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

type Variant = "LOGIN" | "REGISTER";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function LandingScreen() {
  const refRBSheet = useRef<RBSheet>(null);
  const [variant, setVariant] = useState<Variant>("LOGIN");

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

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
      <YStack flex={1} justifyContent="flex-end" margin="$4" gap="$3">
        <Button
          theme="red"
          onPress={() => refRBSheet.current && refRBSheet.current.open()}
          borderRadius="$8"
          backgroundColor="$red9"
          iconAfter={<AntDesign name="arrowright" size={24} color="white" />}
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
      {/* @ts-ignore */}
      <RBSheet
        ref={refRBSheet}
        height={400}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.7)",
          },
          container: {
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: "rgb(0, 0, 0)",
          },
          draggableIcon: {
            display: "none",
          },
        }}
      >
        <XStack
          justifyContent="space-between"
          alignItems="center"
          borderBottomWidth="$0.5"
          borderBottomColor="$color4"
          paddingVertical="$1.5"
        >
          <TouchableOpacity
            style={{
              marginLeft: 6,
            }}
            onPress={() => {
              refRBSheet.current?.close();
            }}
          >
            <Ionicons name="close-outline" size={28} color="white" />
          </TouchableOpacity>
          <Label fontSize="$7">Log in or sign up</Label>
          <View />
        </XStack>
        {variant === "LOGIN" ? (
          <LoginPage toggleVariant={toggleVariant} />
        ) : (
          <SignUpPage toggleVariant={toggleVariant} />
        )}
      </RBSheet>
    </View>
  );
}
