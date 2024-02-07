import React from "react";
import { TouchableOpacity } from "react-native";
import { Card, H4, Image } from "tamagui";
import { BlurView } from "expo-blur";

interface CardsProps {
  uri: string;
  title: string;
  selected: boolean;
  onPress: () => void;
}

const Cards: React.FC<CardsProps> = ({ uri, title, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        elevate
        marginRight="$2"
        width={120}
        height={85}
        overflow="hidden"
        borderWidth={selected ? 1 : 0}
        borderColor="$red11Dark"
      >
        <Card.Header>
          <H4 fontSize={18}>{selected ? null : title}</H4>
        </Card.Header>
        <Card.Background>
          <Image
            alignSelf="center"
            source={{
              width: 120,
              height: 85,
              uri: uri,
            }}
          />
        </Card.Background>
      </Card>
    </TouchableOpacity>
  );
};

export default Cards;
