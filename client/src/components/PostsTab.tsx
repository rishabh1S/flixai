import React, { useEffect, useState } from "react";
import { Image, YStack } from "tamagui";
import { Dimensions, FlatList, Pressable, RefreshControl } from "react-native";
import { router } from "expo-router";
import { fetchPosts } from "@/api";
import { useGlobalContext } from "../context/GlobalContext";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const PostsTab = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const { updateCurrentPostId } = useGlobalContext();

  const getPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

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
      <Pressable
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#ffffff"]}
          progressBackgroundColor="#111"
        />
      }
      data={posts}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      renderItem={renderItem}
    />
  );
};

export default PostsTab;
