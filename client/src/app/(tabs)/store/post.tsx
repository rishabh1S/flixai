import { fetchPosts } from "@/api";
import { OtherPost, Post } from "@/src/components";
import { useGlobalContext } from "@/src/context/GlobalContext";
import { PostData } from "@/src/utils/types";
import { shuffleArray } from "@/src/utils/utilityFunctions";
import { LinearGradient } from "@tamagui/linear-gradient";
import SkeletonLoader from "expo-skeleton-loader";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { ScrollView, YStack } from "tamagui";

const { width } = Dimensions.get("window");

const Skeleton = () => {
  const size = 50;
  return (
    <SkeletonLoader>
      <SkeletonLoader.Container style={{ gap: 5, marginVertical: 10 }}>
        <SkeletonLoader.Container
          style={[{ flexDirection: "row", marginHorizontal: 12 }]}
        >
          <SkeletonLoader.Item
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              marginRight: 25,
            }}
          />
          <SkeletonLoader.Container style={{ marginTop: 15, marginBottom: 5 }}>
            <SkeletonLoader.Item style={{ width: 120, height: 18 }} />
          </SkeletonLoader.Container>
        </SkeletonLoader.Container>
        <SkeletonLoader.Item
          style={{
            width: width,
            height: width,
            marginVertical: 2,
          }}
        />
        <SkeletonLoader.Container
          style={{
            marginHorizontal: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <SkeletonLoader.Container style={{ gap: 6 }}>
            <SkeletonLoader.Item style={{ width: 300, height: 15 }} />
            <SkeletonLoader.Item style={{ width: 100, height: 15 }} />
          </SkeletonLoader.Container>
          <SkeletonLoader.Item
            style={{ width: 30, height: 30, borderRadius: 10 }}
          />
        </SkeletonLoader.Container>
      </SkeletonLoader.Container>
    </SkeletonLoader>
  );
};

export default function PostScreen() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentPostId } = useGlobalContext();

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  return (
    <LinearGradient colors={["#000", "#000", "#201", "#311"]} flex={1}>
      {loading ? (
        <>
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Post />
          <YStack paddingBottom="$9">
            {shuffleArray(posts)
              .filter((post) => post._id !== currentPostId)
              .map((post) => (
                <OtherPost key={post._id} post={post} />
              ))}
          </YStack>
        </ScrollView>
      )}
    </LinearGradient>
  );
}
