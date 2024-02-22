import { useEffect } from "react";
import { ImageBackground } from "react-native";

import OverlayCardView from "src/components/ui/OverlayCardView";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useImageFile } from "src/hooks/useImageFile";

const RockImage = ({ item }: { item: any }) => {
  const image = useImageFile(item?.Photo?.data?.attributes?.url);
  useEffect(() => {
    console.log("image w useeffect", image);
  }, [image]);
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
      <View height={200} gap='m' borderRadius={12} justifyContent='flex-end'>
        <OverlayCardView
          backgroundColor='backgroundLight'
          position='absolute'
          bottom={20}
          right={20}
        >
          <Text variant='caption'>{`Autor: ${item.Author}`}</Text>
        </OverlayCardView>
      </View>
    </ImageBackground>
  );
};

export default RockImage;
