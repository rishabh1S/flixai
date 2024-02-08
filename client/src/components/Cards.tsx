import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, Card, Text, Image, XStack } from "tamagui";

interface CardsProps {
  uri: string;
  avataruri?: string;
  title: string;
  selected?: boolean;
  onPress: () => void;
  width: number;
  height: number;
  mr: string;
}

const Cards: React.FC<CardsProps> = ({
  uri,
  avataruri,
  title,
  selected,
  onPress,
  width,
  height,
  mr,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        elevate
        animation="bouncy"
        marginRight={mr}
        width={width}
        height={height}
        overflow="hidden"
        borderWidth={selected ? 1 : 0}
        borderColor="$red11Dark"
      >
        <Card.Header padded>
          <Text fontSize={20} fontWeight={"bold"}>
            {selected ? null : title}
          </Text>
        </Card.Header>
        <Card.Footer padded>
          <XStack flex={1} />
          <Avatar circular>
            <Avatar.Image accessibilityLabel="Cam" src={avataruri} />
            <Avatar.Fallback backgroundColor="$red10" />
          </Avatar>
        </Card.Footer>
        <Card.Background>
          <Image
            alignSelf="center"
            source={{
              width: width,
              height: height,
              uri: uri,
            }}
          />
        </Card.Background>
      </Card>
    </TouchableOpacity>
  );
};

export default Cards;
