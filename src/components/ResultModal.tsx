import React from "react";
import Modal from "react-native-modal";
import { LinearGradient } from "@tamagui/linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  Card,
  Button,
  XStack,
  YStack,
  TextArea,
  Label,
} from "tamagui";
import { TouchableOpacity } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
  Feather,
} from "@expo/vector-icons";

interface ResultModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationInTiming={500}
      animationOut="slideOutDown"
      animationOutTiming={500}
      presentationStyle="overFullScreen"
      useNativeDriver
      swipeDirection={"down"}
      propagateSwipe
      style={{ margin: 0 }}
    >
      <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
        <SafeAreaView
          style={{
            marginBottom: 12,
          }}
        >
          <View
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom={8}
            paddingHorizontal="$4"
          >
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons
                name="keyboard-backspace"
                size={26}
                color="white"
              />
            </TouchableOpacity>
            <Text fontSize="$7" marginLeft="$-3.5">
              Result
            </Text>
            <View />
          </View>
        </SafeAreaView>
        <YStack gap="$2" marginHorizontal="$3">
          <Card elevate overflow="hidden">
            <Image
              source={{
                uri: "https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910913/FlixAi/default-sample.png",
              }}
              style={{ aspectRatio: 9 / 13 }}
            />
          </Card>
          <XStack
            theme={"red"}
            gap="$4"
            justifyContent="center"
            marginVertical="$2"
          >
            <Button
              iconAfter={<Feather name="repeat" size={24} color="white" />}
              size="$3"
            >
              Remix
            </Button>
            <Button
              iconAfter={<Octicons name="download" size={24} color="white" />}
              size="$3"
            >
              Download
            </Button>
            <Button
              iconAfter={
                <MaterialCommunityIcons
                  name="share-outline"
                  size={24}
                  color="white"
                />
              }
              size="$3"
            >
              Share
            </Button>
          </XStack>
          <YStack>
            <Label fontSize="$7">Prompt</Label>
            <TextArea
              theme={"red"}
              size="$5"
              borderWidth={1}
              rows={5}
              placeholder="Forest Elf"
              disabled
            />
          </YStack>
        </YStack>
      </LinearGradient>
    </Modal>
  );
};

export default ResultModal;
