import React from "react";
import { Image } from "tamagui";
import {
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
} from "react-native";
import { PostData } from "@/src/utils/types";
import { useGlobalContext } from "@/src/context/GlobalContext";
import { router } from "expo-router";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface PostLayoutProps {
  refreshing?: boolean;
  onRefresh?: () => void;
  posts: PostData[];
}

const PostsLayout: React.FC<PostLayoutProps> = ({
  refreshing,
  onRefresh,
  posts,
}) => {
  const { updateCurrentPostId } = useGlobalContext();

  const renderItem = (item: PostData, index: number) => {
    let itemWidth, itemHeight;
    index = index % 7;
    if (index === 0 || index === 3) {
      itemWidth = width * 0.6;
      itemHeight = height * 0.25;
    } else if (index === 1 || index === 2) {
      itemWidth = width * 0.378;
      itemHeight = height * 0.25;
    } else if (index === 4 || index === 5) {
      itemWidth = width * 0.489;
      itemHeight = width * 0.489;
    } else {
      itemWidth = width;
      itemHeight = height * 0.35;
    }

    return (
      <Pressable
        key={item._id}
        onPress={() => {
          updateCurrentPostId(item._id);
          router.push({ pathname: "/store/post", params: { id: item._id } });
        }}
      >
        <Image
          source={{
            uri: item.imageURL,
            width: itemWidth,
            height: itemHeight,
          }}
          style={{ margin: 2 }}
        />
      </Pressable>
    );
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing!}
          onRefresh={onRefresh}
          colors={["#ffffff"]}
          progressBackgroundColor="#111"
        />
      }
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {posts.map((item, index) => renderItem(item, index))}
    </ScrollView>
  );
};

export default PostsLayout;
