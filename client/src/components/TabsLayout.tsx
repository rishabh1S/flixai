import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { XStack, Text } from "tamagui";
import PostsTab from "./PostsTab";
import UsersTab from "./UsersTab";

interface TabsLayoutProps {
  activeTab: string;
}

const FirstRoute = () => <PostsTab showOptions={true} />;

const SecondRoute = () => <UsersTab />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const TabsLayout: React.FC<TabsLayoutProps> = ({ activeTab }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(activeTab === "first" ? 0 : 1);
  const [routes] = React.useState([
    { key: "first", title: "Posts" },
    { key: "second", title: "Users" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "#F2555A" }}
          style={{ backgroundColor: "black" }}
          renderLabel={({ route, color }) => (
            <XStack gap="$3" alignItems="center">
              <Ionicons
                name={
                  route.key === "first" ? "image-outline" : "person-outline"
                }
                size={24}
                color={color}
              />
              <Text color={color}>{route.title}</Text>
            </XStack>
          )}
        />
      )}
    />
  );
};

export default TabsLayout;
