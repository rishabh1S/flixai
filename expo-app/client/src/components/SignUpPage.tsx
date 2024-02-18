import { useSignUp } from "@clerk/clerk-expo";
import { LinearGradient } from "@tamagui/linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button, Form, Input, Spinner, Text, View, XStack } from "tamagui";
import { generateUsername } from "../utils/utilityFunctions";
import TextInput from "./TextInput";

type SignUpPageProps = {
  toggleVariant: () => void;
};

const VerificationScreen: React.FC = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "submitting" && !loading) {
      setStatus("off");
    }
  }, [status, loading]);

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      setLoading(true);
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      await setActive({ session: completeSignUp.createdSessionId });
      router.push("/");
    } catch (err: any) {
      Alert.alert(`Error: ${err.errors[0].code}`, err.errors[0].longMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
};

const SignUpPage: React.FC<SignUpPageProps> = ({ toggleVariant }) => {
  const { isLoaded, signUp } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "submitting" && !loading) {
      setStatus("off");
    }
  }, [status, loading]);

  useEffect(() => {
    const generatedUsername = generateUsername();
    setUsername(generatedUsername);
  }, []);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      setLoading(true);
      await signUp.create({
        emailAddress,
        password,
        username,
        firstName,
        lastName,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert(`Error: ${err.errors[0].code}`, err.errors[0].longMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <View flex={1} justifyContent="center">
        {pendingVerification ? (
          <VerificationScreen />
        ) : (
          <>
            <Form
              onSubmit={() => setStatus("submitting")}
              gap="$4"
              marginHorizontal="$3"
            >
              <XStack justifyContent="space-between">
                <View width={"48%"}>
                  <TextInput
                    placeholder="First Name"
                    textContentType="name"
                    value={firstName}
                    onChangeText={(firstName) => setFirstName(firstName)}
                  />
                </View>
                <View width={"48%"}>
                  <TextInput
                    placeholder="Last Name"
                    textContentType="name"
                    value={lastName}
                    onChangeText={(lastName) => setLastName(lastName)}
                  />
                </View>
              </XStack>
              <TextInput
                placeholder="Email address"
                textContentType="emailAddress"
                value={emailAddress}
                onChangeText={(email) => setEmailAddress(email)}
              />
              <TextInput
                placeholder="Password"
                textContentType="password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(password) => setPassword(password)}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <Form.Trigger asChild disabled={status !== "off"}>
                <Button
                  onPress={onSignUpPress}
                  theme="red"
                  backgroundColor="$red10"
                  iconAfter={
                    status === "submitting"
                      ? () => <Spinner color="$color" />
                      : undefined
                  }
                >
                  Sign Up
                </Button>
              </Form.Trigger>
            </Form>
            <Text textAlign="center" marginTop="$5" color="$color11">
              Already have an account?{" "}
              <Text onPress={toggleVariant} color="$red10">
                Login
              </Text>
            </Text>
          </>
        )}
      </View>
    </LinearGradient>
  );
};

export default SignUpPage;
