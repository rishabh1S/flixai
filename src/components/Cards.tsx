import React from "react";
import { Card, H3, H4, Image } from "tamagui";

interface ImageCardProps {
  uri: string;
  title: string;
}

const Cards: React.FC<ImageCardProps> = ({ uri, title }) => {
  return (
    <Card elevate size="$4.5" marginRight="$2" width={120} height={85}>
      <Card.Header>
        <H4 fontSize={18}>{title}</H4>
      </Card.Header>
      <Card.Background>
        <Image
          resizeMode="cover"
          alignSelf="center"
          source={{
            width: 120,
            height: 85,
            uri: uri,
          }}
          borderRadius={16}
        />
      </Card.Background>
    </Card>
  );
};

export default Cards;
