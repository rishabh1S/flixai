import { Input, View } from "tamagui";
import React from "react";
import { KeyboardTypeOptions, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

type InputFieldProps = {
  placeholder: string;
  textContentType: any;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (value: string) => void;
  showPassword?: boolean;
  setShowPassword?: (showPassword: boolean) => void;
};

const TextInput: React.FC<InputFieldProps> = ({
  placeholder,
  textContentType,
  keyboardType,
  secureTextEntry,
  value,
  onChangeText,
  showPassword,
  setShowPassword,
}) => {
  return (
    <View>
      <Input
        size="$5"
        placeholder={placeholder}
        textContentType={textContentType}
        keyboardType={keyboardType}
        borderRadius="$5"
        cursorColor="white"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
      {textContentType === "password" && setShowPassword && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ position: "absolute", right: 12, top: 15 }}
        >
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextInput;
