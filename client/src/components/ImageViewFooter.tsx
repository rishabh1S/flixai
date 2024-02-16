import React from "react";
import { XStack } from "tamagui";
import { Pressable } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

interface ImageViewFooterProps {
  onDownload: () => void;
  onShare: () => void;
}

const ImageViewFooter: React.FC<ImageViewFooterProps> = ({
  onDownload,
  onShare,
}) => {
  return (
    <XStack marginVertical="$4" justifyContent="center" gap="$4">
      <Pressable
        onPress={onDownload}
        style={{ backgroundColor: "#211", padding: 10, borderRadius: 25 }}
      >
        <Feather name="download" size={28} color="white" />
      </Pressable>
      <Pressable
        onPress={onShare}
        style={{ backgroundColor: "#211", padding: 10, borderRadius: 25 }}
      >
        <MaterialCommunityIcons name="share-outline" size={28} color="white" />
      </Pressable>
    </XStack>
  );
};

export default ImageViewFooter;
