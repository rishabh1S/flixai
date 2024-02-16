import React, { useEffect, useState } from "react";
import { LinearGradient } from "@tamagui/linear-gradient";
import { OtherPost, Post } from "@/src/components";
import { ScrollView, YStack } from "tamagui";
import { fetchPosts } from "@/api";
import { useGlobalContext } from "@/src/context/GlobalContext";
import { PostData } from "@/src/utils/types";

export default function PostScreen() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const { currentPostId } = useGlobalContext();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getPosts();
  }, []);

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Post />
        <YStack paddingBottom="$9">
          {posts
            .sort(() => Math.random() - 0.5)
            .filter((post) => post._id !== currentPostId)
            .map((post) => (
              <OtherPost key={post._id} post={post} />
            ))}
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
}
