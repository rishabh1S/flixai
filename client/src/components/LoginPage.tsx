import { Button, Input, View, Spinner, Text, Form } from "tamagui";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "@tamagui/linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";

type LoginPageProps = {
  toggleVariant: () => void;
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

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <View flex={1} justifyContent="center">
        <Form
          onSubmit={() => setStatus("submitting")}
          gap="$4"
          marginHorizontal="$3"
        >
          <Input
            size="$5"
            placeholder="Email address"
            textContentType="emailAddress"
            borderRadius="$5"
            cursorColor="white"
            value={emailAddress}
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 8,
              }}
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
      </View>
    </LinearGradient>
  );
};

export default LoginPage;
