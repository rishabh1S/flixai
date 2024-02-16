import { LinearGradient } from "@tamagui/linear-gradient";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Headers, PostsLayout } from "@/src/components";
import { Input, Text, XStack } from "tamagui";
import { AntDesign } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { PostData } from "@/src/utils/types";
import { fetchPosts } from "@/api";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [results, setResults] = useState<PostData[]>([]);

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
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
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
      <PostsLayout
        refreshing={refreshing}
        onRefresh={onRefresh}
        posts={searchText.length > 2 ? results : posts}
      />
    </LinearGradient>
  );
}
