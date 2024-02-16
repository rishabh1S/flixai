import React from "react";
import { View, Image, Avatar } from "tamagui";
import { useUserContext } from "../context/UserContext";

const Headers = () => {
  const { userAvatar } = useUserContext();
  return (
    <View
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      marginHorizontal={16}
      marginVertical={8}
    >
      <View>
        <Image
          flex={1}
          width={100}
          source={require("../../assets/images/logo.png")}
        />
      </View>
      <Avatar circular size={"$3"}>
        <Avatar.Image accessibilityLabel="Cam" src={userAvatar} />
        <Avatar.Fallback backgroundColor="$red10" />
      </Avatar>
    </View>
  );
};

export default Headers;
