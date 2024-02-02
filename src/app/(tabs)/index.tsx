import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Image,
  Label,
  ScrollView,
  TextArea,
  Text,
  View,
  XStack,
  YStack,
  Switch,
} from "tamagui";
import { LinearGradient } from "@tamagui/linear-gradient";
import { Accordians, Cards, Chip, NumberStepper } from "@/src/components";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function GenerateScreen() {
  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <SafeAreaView style={{ marginBottom: 10 }}>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginHorizontal={16}
          marginVertical={8}
        >
          <View>
            <Image
              flex={1}
              width={100}
              source={require("../../../assets/images/logo.png")}
            />
          </View>
          <TouchableOpacity onPress={() => router.replace("/")}>
            <Feather name="settings" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View marginHorizontal="$2.5">
          <View flexDirection="row" alignItems="center" gap="$2">
            <Label size="$5">Enter your prompt</Label>
            <Feather name="info" size={18} color="blue" />
          </View>
          <TextArea
            cursorColor="white"
            size="$5"
            rows={6}
            borderWidth={1}
            placeholder="Dragon in the vivid futuristic city..."
          />
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 60,
          flexGrow: 1,
        }}
      >
        <YStack marginHorizontal="$2.5" marginBottom="$3" gap="$2">
          <Label fontSize="$7">Aspect Ratio</Label>
          <XStack justifyContent="space-between">
            <Chip title="1:1" />
            <Chip title="3:5" />
            <Chip title="9:7" />
            <Chip title="18:9" />
            <Chip title="5:2" />
          </XStack>
        </YStack>
        <XStack
          marginHorizontal="$2.5"
          marginBottom="$3"
          alignItems="center"
          justifyContent="space-between"
        >
          <YStack>
            <XStack alignItems="center">
              <Label fontSize="$7">Image Quality </Label>
              <MaterialIcons name="hd" size={20} color="white" />
            </XStack>
            <Text color="gray" marginTop="$-2" fontSize="$1">
              Get Image in High Resoltion
            </Text>
          </YStack>
          <Switch size="$2" theme="red">
            <Switch.Thumb animation="bouncy" />
          </Switch>
        </XStack>
        <NumberStepper min={1} max={8} />
        <YStack marginHorizontal="$2.5" marginBottom="$0.5">
          <Label fontSize="$7" marginBottom="$1">
            Choose Preset
          </Label>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Cards
              title="Default"
              uri="https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910913/FlixAi/default-sample.png"
            />
            <Cards
              title="Realistic"
              uri="https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910913/FlixAi/realistic-sample.png"
            />
            <Cards
              title="Anime"
              uri="https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910914/FlixAi/anime-sample.png"
            />
          </ScrollView>
        </YStack>
        <YStack marginVertical="$2.5">
          <Accordians />
        </YStack>
        <View flex={1} justifyContent="flex-end" marginBottom="$2">
          <Button
            backgroundColor="$red11Dark"
            borderRadius="$6"
            marginHorizontal="$2.5"
          >
            Generate
            <MaterialCommunityIcons
              name="star-four-points-outline"
              size={24}
              color="white"
            />
          </Button>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
