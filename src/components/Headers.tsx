import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Image } from "tamagui";
import { AntDesign } from "@expo/vector-icons";

const Headers = () => {
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
      <TouchableOpacity>
        <AntDesign name="message1" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Headers;
