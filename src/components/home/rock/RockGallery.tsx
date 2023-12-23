import { ImageBackground, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import OverlayCardView from "src/components/ui/OverlayCardView";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useImageFile } from "src/hooks/useImageFile";
import { Cover } from "src/services/rocks";

type RockGalleryProps = {
  images: Cover[];
};

const RockGallery = ({ images }: RockGalleryProps) => {
  const { width } = useWindowDimensions();
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          paddingLeft='m'
          paddingRight='xl'
          gap='m'
          flexDirection='row'
          marginTop='l'
        >
          {images.map((item) => {
            const image = useImageFile(item.Photo.data.attributes.url);
            if (!image) return;
            return (
              <ImageBackground
                source={{
                  uri: image || "",
                }}
                resizeMode='cover'
                imageStyle={{ borderRadius: 24 }}
              >
                <View
                  width={width - 32}
                  height={180}
                  gap='m'
                  borderRadius={12}
                  justifyContent='flex-end'
                  padding='m'
                >
                  <OverlayCardView
                    alignSelf='flex-start'
                    backgroundColor='backgroundFaded'
                  >
                    <Text variant='caption'>{`Autor: ${item.Author}`}</Text>
                  </OverlayCardView>
                </View>
              </ImageBackground>
            );
          })}
        </View>
      </ScrollView>
      {/* <LinearGradient
        colors={["rgb(255, 255, 255)", "rgba(255, 255, 255, 0)"]}
        start={[0, 1]}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 30,
        }}
      />
      <LinearGradient
        colors={["rgba(255, 255, 255, 0)", "rgb(255, 255, 255)"]}
        start={[0, 1]}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: 30,
        }}
      /> */}
    </View>
  );
};

export default RockGallery;
