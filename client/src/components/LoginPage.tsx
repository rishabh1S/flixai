import { Button, View, Spinner, Text, Form, XStack } from "tamagui";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "@tamagui/linear-gradient";
import { Alert, TouchableOpacity } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import TextInput from "./TextInput";

type LoginPageProps = {
  toggleVariant: () => void;
};

type ForgotPasswordScreenProps = {
  reset: () => void;
};

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  reset,
}) => {
  const { signIn } = useSignIn();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "submitting" && !loading) {
      setStatus("off");
    }
  }, [status, loading]);

  const resetPassword = async () => {
    try {
      setLoading(true);
      await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });
      router.push("/");
    } catch (err: any) {
      Alert.alert(`Error: ${err.errors[0].code}`, err.errors[0].longMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        gap="$4"
        marginHorizontal="$3"
        onSubmit={() => setStatus("submitting")}
      >
        <TextInput
          placeholder="Reset Code"
          textContentType="oneTimeCode"
          keyboardType="numeric"
          value={code}
          onChangeText={(code) => setCode(code)}
        />
        <TextInput
          placeholder="New Password"
          secureTextEntry
          textContentType="password"
          value={newPassword}
          onChangeText={(newPassword) => setNewPassword(newPassword)}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <Form.Trigger asChild disabled={status !== "off"}>
          <Button
            theme="red"
            backgroundColor="$red10"
            iconAfter={
              status === "submitting"
                ? () => <Spinner color="$color" />
                : undefined
            }
            onPress={resetPassword}
          >
            Reset Password
          </Button>
        </Form.Trigger>
      </Form>
      <XStack alignItems="center" marginTop="$5" justifyContent="center">
        <Text color="$color11">Not recieved yet?</Text>
        <TouchableOpacity onPress={reset}>
          <Text color="$red10"> Resend Code</Text>
        </TouchableOpacity>
      </XStack>
    </>
  );
};

const LoginPage: React.FC<LoginPageProps> = ({ toggleVariant }) => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );
  const [loading, setLoading] = useState(false);
  const [showForgotScreen, setShowForgotScreen] = useState(false);

  useEffect(() => {
    if (status === "submitting" && !loading) {
      setStatus("off");
    }
  }, [status, loading]);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      setLoading(true);
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
      router.push("/");
    } catch (err: any) {
      Alert.alert(`Error: ${err.errors[0].code}`, err.errors[0].longMessage);
    } finally {
      setLoading(false);
    }
  };

  const sendResetCode = async () => {
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setShowForgotScreen(true);
    } catch (err: any) {
      Alert.alert(`Error: ${err.errors[0].code}`, err.errors[0].longMessage);
    }
  };

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <View flex={1} justifyContent="center">
        {showForgotScreen ? (
          <ForgotPasswordScreen reset={sendResetCode} />
        ) : (
          <>
            <Form
              onSubmit={() => setStatus("submitting")}
              gap="$4"
              marginHorizontal="$3"
            >
              <TextInput
                placeholder="Email address"
                textContentType="emailAddress"
                value={emailAddress}
                onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
              />
              <View>
                <TextInput
                  placeholder="Password"
                  textContentType="password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 8,
                  }}
                  onPress={sendResetCode}
                >
                  <Text color="$red10">Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <Form.Trigger asChild disabled={status !== "off"}>
                <Button
                  theme="red"
                  backgroundColor="$red10"
                  iconAfter={
                    status === "submitting"
                      ? () => <Spinner color="$color" />
                      : undefined
                  }
                  onPress={onSignInPress}
                >
                  Login
                </Button>
              </Form.Trigger>
            </Form>
            <Text textAlign="center" marginTop="$5" color="$color11">
              First time using FlixAi?{" "}
              <Text onPress={toggleVariant} color="$red10">
                Create an account
              </Text>
            </Text>
          </>
        )}
      </View>
    </LinearGradient>
  );
};

export default LoginPage;
