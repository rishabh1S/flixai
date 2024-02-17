import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { AlertDialog, Button, Text, XStack, YStack } from "tamagui";

interface AlertsProps {
  title: string;
  content: string;
  btnText: string;
  actionBtnText: string;
  action: () => void;
}

const Alerts: React.FC<AlertsProps> = ({
  title,
  content,
  btnText,
  actionBtnText,
  action,
}) => {
  return (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        {actionBtnText === "Delete" ? (
          <Text color="$red11Light" textAlign="center">
            {btnText}
          </Text>
        ) : (
          <Button
            iconAfter={<MaterialIcons name="publish" size={24} color="white" />}
            size="$3"
          >
            {btnText}
          </Button>
        )}
      </AlertDialog.Trigger>
      <AlertDialog.Portal theme="dark">
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
          marginHorizontal="$3"
        >
          <YStack space="$2">
            <AlertDialog.Title fontSize="$8">{title}</AlertDialog.Title>
            <AlertDialog.Description fontSize="$3">
              {content}
            </AlertDialog.Description>

            <XStack space="$4" justifyContent="flex-end" marginTop="$3">
              <AlertDialog.Cancel asChild>
                <Button size="$3.5">Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button size="$3.5" color="$red11Light" onPress={action}>
                  {actionBtnText}
                </Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};

export default Alerts;
