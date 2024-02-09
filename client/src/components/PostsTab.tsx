import React from "react";
import { Button, XStack, Image } from "tamagui";
import { dummyImages } from "../constants/data";
import { Dimensions, FlatList } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const PostsTab = () => {
  const repeatedDummyImages = Array.from(
    { length: 8 },
    (_, index) => dummyImages
  ).flat();

  const renderItem = ({ item, index }: any) => {
    let itemWidth, itemHeight;
    index = index % 8;
    if (index === 0 || index === 3) {
      itemWidth = width * 0.62;
      itemHeight = height * 0.25;
    } else if (index === 1 || index === 2) {
      itemWidth = width * 0.38;
      itemHeight = height * 0.25;
    } else if (index === 4 || index === 5) {
      itemWidth = width * 0.5;
      itemHeight = width * 0.5;
    } else {
      itemWidth = width;
      itemHeight = height * 0.35;
    }

    return (
      <Image
        source={{
          uri: item,
          width: itemWidth,
          height: itemHeight,
        }}
        style={{ margin: 2 }}
      />
    );
  };

  return (
    <>
      <XStack
        marginVertical="$2"
        paddingHorizontal="$4"
        justifyContent="space-between"
      >
        <XStack gap="$3">
          <Button size={"$2"} borderRadius={"$7"}>
            Following
          </Button>
          <Button size={"$2"} borderRadius={"$7"}>
            Recent
          </Button>
        </XStack>
        <EvilIcons name="redo" size={24} color="white" />
      </XStack>
      <FlatList
        data={repeatedDummyImages}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={renderItem}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </>
  );
};

export default PostsTab;
