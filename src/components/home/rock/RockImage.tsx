import { ImageBackground, useWindowDimensions } from "react-native";

import OverlayCardView from "src/components/ui/OverlayCardView";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useImageFile } from "src/hooks/useImageFile";

const RockImage = ({ item }: { item: any }) => {
  const { width } = useWindowDimensions();
  const image = useImageFile(item.Photo.data.attributes.url);
  if (!image) return <View />;
  return (
    <ImageBackground
      source={{
        uri: image || "",
      }}
      resizeMode='cover'
      imageStyle={{ borderRadius: 24, marginTop: 12 }}
      key={item.id}
    >
      <View
        height={200}
        gap='m'
        borderRadius={12}
        justifyContent='flex-end'
        padding='m'
      >
        <OverlayCardView
          alignSelf='flex-start'
          backgroundColor='backgroundSecondary'
        >
          <Text variant='caption'>{`Autor: ${item.Author}`}</Text>
        </OverlayCardView>
      </View>
    </ImageBackground>
  );
};

export default RockImage;
