import { fetchPosts } from "@/api";
import { Headers, PostsLayout } from "@/src/components";
import { PostData } from "@/src/utils/types";
import { shuffleArray } from "@/src/utils/utilityFunctions";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import SkeletonLoader from "expo-skeleton-loader";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, Text, XStack } from "tamagui";

const { width, height } = Dimensions.get("window");

const Skeleton = () => {
  return (
    <SkeletonLoader>
      <SkeletonLoader.Container
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <SkeletonLoader.Item
          style={{
            width: width * 0.595,
            height: height * 0.25,
            marginVertical: 2,
          }}
        />
        <SkeletonLoader.Item
          style={{
            width: width * 0.395,
            height: height * 0.25,
            marginVertical: 2,
          }}
        />
      </SkeletonLoader.Container>
      <SkeletonLoader.Container
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <SkeletonLoader.Item
          style={{
            width: width * 0.395,
            height: height * 0.25,
            marginVertical: 2,
          }}
        />
        <SkeletonLoader.Item
          style={{
            width: width * 0.595,
            height: height * 0.25,
            marginVertical: 2,
          }}
        />
      </SkeletonLoader.Container>
      <SkeletonLoader.Container
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <SkeletonLoader.Item
          style={{
            width: width * 0.495,
            height: width * 0.495,
            marginVertical: 2,
          }}
        />
        <SkeletonLoader.Item
          style={{
            width: width * 0.495,
            height: width * 0.495,
            marginVertical: 2,
          }}
        />
      </SkeletonLoader.Container>
      <SkeletonLoader.Item
        style={{
          width: width,
          height: height * 0.35,
          marginVertical: 2,
        }}
      />
    </SkeletonLoader>
  );
};

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [results, setResults] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleSearch = (query: string) => {
    try {
      if (query && query.length > 2) {
        const filteredResults = posts.filter((post) =>
          post.prompt.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error filtering search results:", error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPosts();
  }, []);

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <SafeAreaView style={{ marginBottom: 10 }}>
        <Headers />
        <XStack
          marginHorizontal="$3"
          alignItems="center"
          marginVertical="$1.5"
          gap="$2"
        >
          <Input
            flex={1}
            size="$4"
            placeholder="Search"
            cursorColor={"white"}
            fontSize={"$3"}
            paddingLeft={"$7"}
            value={searchText}
            onChangeText={(searchText) => {
              setSearchText(searchText);
              handleSearch(searchText);
            }}
          />
          {searchText.length > 0 ? (
            <Pressable onPress={() => setSearchText("")}>
              <Text color={"$red10Dark"}>Cancel</Text>
            </Pressable>
          ) : null}
          <AntDesign
            name="search1"
            size={18}
            color="gray"
            style={{ position: "absolute", left: 10 }}
          />
        </XStack>
      </SafeAreaView>
      {loading ? (
        <Skeleton />
      ) : (
        <PostsLayout
          refreshing={refreshing}
          onRefresh={onRefresh}
          posts={searchText.length > 2 ? results : shuffleArray(posts)}
        />
      )}
    </LinearGradient>
  );
}
