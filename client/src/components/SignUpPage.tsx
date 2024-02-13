import { Button, Input, View, Spinner, Text, Form, YStack } from "tamagui";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "@tamagui/linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { generateUsername } from "@/api";

type SignUpPageProps = {
  toggleVariant: () => void;
};

const SignUpPage: React.FC<SignUpPageProps> = ({ toggleVariant }) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );

  useEffect(() => {
    if (status === "submitting" && !isLoaded) {
      setStatus("off");
    }
  }, [status, isLoaded]);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const generatedUsername = await generateUsername();
      setUsername(generatedUsername);
      await signUp.create({
        emailAddress,
        password,
        username,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert(`Error: ${err.errors[0].code}`, err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      await setActive({ session: completeSignUp.createdSessionId });
      router.push("/");
    } catch (err: any) {
      Alert.alert(`Error: ${err.errors[0].code}`, err.errors[0].longMessage);
    }
  };

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <View flex={1} justifyContent="center">
        {pendingVerification ? (
          <Form
            onSubmit={() => setStatus("submitting")}
            gap="$7"
            marginHorizontal="$3"
          >
            <Input
              size="$5"
              placeholder="Verification Code"
              maxLength={6}
              value={code}
              onChangeText={(code) => setCode(code)}
              keyboardType="numeric"
              cursorColor="white"
            />
            <Form.Trigger asChild disabled={status !== "off"}>
              <Button
                onPress={onPressVerify}
                theme="red"
                backgroundColor="$red10"
                iconAfter={
                  status === "submitting"
                    ? () => <Spinner color="$color" />
                    : undefined
                }
              >
                Verify Email
              </Button>
            </Form.Trigger>
          </Form>
        ) : (
          <YStack>
            <YStack gap="$4" marginHorizontal="$3">
              <Input
                size="$5"
                placeholder="Full Name"
                textContentType="name"
                borderRadius="$5"
                cursorColor="white"
                value={name}
                onChangeText={(name) => setName(name)}
              />
              <Input
                size="$5"
                placeholder="Email address"
                textContentType="emailAddress"
                borderRadius="$5"
                cursorColor="white"
                value={emailAddress}
                onChangeText={(email) => setEmailAddress(email)}
              />
              <View>
                <Input
                  size="$5"
                  placeholder="Password"
                  textContentType="password"
                  borderRadius="$5"
                  cursorColor="white"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 12, top: 15 }}
                >
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              <Button
                theme="red"
                backgroundColor="$red10"
                onPress={onSignUpPress}
              >
                Sign Up
              </Button>
            </YStack>
            <Text textAlign="center" marginTop="$5" color="$color11">
              Already have an account?{" "}
              <Text onPress={toggleVariant} color="$red10">
                Login
              </Text>
            </Text>
          </YStack>
        )}
      </View>
    </LinearGradient>
  );
};

export default SignUpPage;
