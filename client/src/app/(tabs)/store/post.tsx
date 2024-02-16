import React, { useEffect, useState } from "react";
import { LinearGradient } from "@tamagui/linear-gradient";
import { OtherPost, Post } from "@/src/components";
import { ScrollView, YStack } from "tamagui";
import { fetchPosts } from "@/api";
import { useGlobalContext } from "@/src/context/GlobalContext";

interface PostData {
  _id: string;
  username: string;
  userProfileUri: string;
  imageURL: string;
  tempImageURL: string;
  prompt: string;
  createdAt: Date;
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

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

  shuffleArray(posts);

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Post />
        <YStack paddingBottom="$9">
          {posts
            .filter((post) => post._id !== currentPostId)
            .map((post) => (
              <OtherPost key={post._id} post={post} />
            ))}
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
}
