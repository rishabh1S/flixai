import React from "react";
import { Image } from "tamagui";
import { Pressable, RefreshControl, ScrollView } from "react-native";
import { PostData } from "@/src/utils/types";
import { useGlobalContext } from "@/src/context/GlobalContext";
import { router } from "expo-router";
import { getItemDimensions } from "../utils/utilityFunctions";

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
    const { itemWidth, itemHeight } = getItemDimensions(index);

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
          style={{ marginVertical: 2 }}
        />
      </Pressable>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
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
