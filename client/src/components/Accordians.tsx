import { AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Accordion,
  Button,
  Image,
  Input,
  Label,
  Square,
  Switch,
  Text,
  TextArea,
  View,
  XStack,
  YStack,
} from "tamagui";
import Sliders from "./Sliders";

interface AccordiansProps {
  negativePrompt: string;
  setNegativePrompt: React.Dispatch<React.SetStateAction<string>>;
  imageSeed: number;
  setImageSeed: React.Dispatch<React.SetStateAction<number>>;
  setSharpness: React.Dispatch<React.SetStateAction<number>>;
  cnImage: string | undefined;
  setCnImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCnType: React.Dispatch<React.SetStateAction<string>>;
}

const Accordians: React.FC<AccordiansProps> = ({
  negativePrompt,
  setNegativePrompt,
  imageSeed,
  setImageSeed,
  setSharpness,
  cnImage,
  setCnImage,
  setCnType,
}) => {
  const [cnDisplayFileName, setCnDisplayFileName] = React.useState<
    string | undefined
  >();
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setCnImage(base64);
        const timestamp = new Date().toISOString();
        setCnDisplayFileName(`${timestamp}.jpg`);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  return (
    <Accordion overflow="hidden" type="multiple" theme="red">
      <Accordion.Item value="a1">
        <Accordion.Trigger
          flexDirection="row"
          justifyContent="space-between"
          backgroundColor="$colorTransparent"
          borderWidth="$0"
        >
          {({ open }: any) => (
            <>
              <View flexDirection="row" alignItems="center" gap="$3">
                <Feather name="settings" size={22} color="white" />
                <Text>Advance Settings</Text>
              </View>
              <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                <Feather name="chevron-down" size={26} color="white" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.Content
          backgroundColor="$colorTransparent"
          marginTop="$-4.5"
          flexDirection="column"
        >
          <YStack>
            <Label>Upload Image</Label>
            {!cnImage ? (
              <Button
                backgroundColor="$red2Dark"
                borderColor="$red8Dark"
                size="$6"
                borderRadius="$3"
                onPress={pickImage}
              >
                <YStack alignItems="center">
                  <Feather name="upload" size={24} color="white" />
                  <Text>Click to upload</Text>
                </YStack>
              </Button>
            ) : (
              <Button
                backgroundColor="$red2Dark"
                borderColor="$red8Dark"
                size="$6"
                borderRadius="$3"
              >
                <XStack
                  alignItems="center"
                  justifyContent="space-between"
                  flex={1}
                  gap="$3"
                >
                  <XStack alignItems="center" gap="$3">
                    <Image
                      source={{ uri: cnImage }}
                      borderRadius="$3"
                      width="$5"
                      height="$5"
                    />
                    <Text fontSize="$2" color="gray">
                      {cnDisplayFileName}
                    </Text>
                  </XStack>
                  <Button
                    padding="$1.5"
                    size="$2"
                    chromeless
                    onPress={() => {
                      setCnImage(undefined);
                      setCnDisplayFileName(undefined);
                    }}
                  >
                    <AntDesign name="close" size={16} color="white" />
                  </Button>
                </XStack>
              </Button>
            )}
          </YStack>
          <XStack
            alignItems="center"
            justifyContent="space-between"
            marginTop="$2"
          >
            <YStack>
              <Label fontSize="$7">Face Swap</Label>
              <Text color="gray" marginTop="$-2" fontSize="$1">
                Turn this on to swap the face
              </Text>
            </YStack>
            <Switch
              size="$2"
              onCheckedChange={(value) =>
                setCnType(value ? "FaceSwap" : "ImagePrompt")
              }
            >
              <Switch.Thumb animation="bouncy" />
            </Switch>
          </XStack>
          <YStack>
            <Label>Negative prompt</Label>
            <TextArea
              cursorColor="white"
              rows={4}
              placeholder="unrealistic, saturated, watermark..."
              value={negativePrompt}
              onChangeText={setNegativePrompt}
            />
          </YStack>
          <YStack>
            <Label>Image Seed</Label>
            <Input
              cursorColor="white"
              flex={1}
              size="$4"
              placeholder="-1"
              value={imageSeed.toString()}
              onChangeText={(text) => setImageSeed(parseInt(text, 10))}
            />
            <Text color="gray" fontSize="$2">
              Seed to generate image, -1 for random
            </Text>
          </YStack>
          <Sliders
            title="Sharpness"
            min={0}
            max={30}
            step={1}
            defaultValue={2}
            onValueChange={setSharpness}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default Accordians;
