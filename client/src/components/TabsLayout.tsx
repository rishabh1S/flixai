import React, { useState } from "react";
import { LayoutRectangle } from "react-native";
import type { StackProps, TabLayout, TabsTabProps } from "tamagui";
import { AnimatePresence, Text, Tabs, YStack, styled, XStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { PostsTab, UsersTab } from "@/src/components";

interface TabsLayoutProps {
  activeTab: string;
}

const TabsLayout: React.FC<TabsLayoutProps> = ({ activeTab }) => {
  const [tabState, setTabState] = useState<{
    currentTab: string;
    intentAt: TabLayout | null;
    activeAt: TabLayout | null;
    prevActiveAt: TabLayout | null;
  }>({
    activeAt: null,
    currentTab: activeTab,
    intentAt: null,
    prevActiveAt: null,
  });
  const setCurrentTab = (currentTab: string) =>
    setTabState({ ...tabState, currentTab });

  const setIntentIndicator = (intentAt: LayoutRectangle | null) =>
    setTabState({ ...tabState, intentAt });

  const setActiveIndicator = (activeAt: LayoutRectangle | null) =>
    setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt });

  const { activeAt, intentAt, prevActiveAt, currentTab } = tabState;

  const direction = (() => {
    if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
      return 0;
    }

    return activeAt.x > prevActiveAt.x ? -1 : 1;
  })();
  const enterVariant =
    direction === 1 ? "isLeft" : direction === -1 ? "isRight" : "defaultFade";

  const exitVariant =
    direction === 1 ? "isRight" : direction === -1 ? "isLeft" : "defaultFade";
  const handleOnInteraction: TabsTabProps["onInteraction"] = (type, layout) => {
    if (type === "select") {
      setActiveIndicator(layout);
    } else {
      setIntentIndicator(layout);
    }
  };

  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      orientation="horizontal"
      flex={1}
      flexDirection="column"
      activationMode="manual"
      backgroundColor="$colorTransparent"
    >
      <YStack>
        <AnimatePresence>
          {intentAt && (
            <TabsRovingIndicator
              width={intentAt.width}
              height="$0.5"
              x={intentAt.x}
              bottom={0}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeAt && (
            <TabsRovingIndicator
              theme="active"
              active
              width={activeAt.width}
              height="$0.5"
              x={activeAt.x}
              bottom={0}
            />
          )}
        </AnimatePresence>

        <Tabs.List
          disablePassBorderRadius
          loop={false}
          borderColor="$color3"
          borderBottomWidth="$0.5"
        >
          <Tabs.Tab
            unstyled
            padding="$3"
            value="tab1"
            onInteraction={handleOnInteraction}
            width={"50%"}
          >
            <XStack gap="$3" alignItems="center">
              <Ionicons name="image-outline" size={24} color="white" />
              <Text>Posts</Text>
            </XStack>
          </Tabs.Tab>

          <Tabs.Tab
            unstyled
            padding="$3"
            value="tab2"
            onInteraction={handleOnInteraction}
            width={"50%"}
          >
            <XStack gap="$3" alignItems="center">
              <Ionicons name="person-outline" size={24} color="white" />
              <Text>Users</Text>
            </XStack>
          </Tabs.Tab>
        </Tabs.List>
      </YStack>
      <AnimatePresence
        exitBeforeEnter
        enterVariant={enterVariant}
        exitVariant={exitVariant}
      >
        <AnimatedYStack
          key={currentTab}
          animation="100ms"
          x={0}
          opacity={1}
          flex={1}
        >
          <Tabs.Content
            value={currentTab}
            forceMount
            flex={1}
            justifyContent="center"
          >
            {currentTab === "tab1" ? <PostsTab /> : <UsersTab />}
          </Tabs.Content>
        </AnimatedYStack>
      </AnimatePresence>
    </Tabs>
  );
};

const TabsRovingIndicator = ({
  active,
  ...props
}: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$color5"
      opacity={0.7}
      animation="100ms"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: "$red9",
        opacity: 0.6,
      })}
      {...props}
    />
  );
};

const AnimatedYStack = styled(YStack, {
  variants: {
    isLeft: { true: { x: -25, opacity: 0 } },

    isRight: { true: { x: 25, opacity: 0 } },

    defaultFade: { true: { opacity: 0 } },
  } as const,
});

export default TabsLayout;
