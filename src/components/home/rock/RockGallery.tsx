import { useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import View from "src/components/ui/View";

import { Cover } from "src/services/rocks";
import RockImage from "./RockImage";

type RockGalleryProps = {
  images: Cover[];
};

const RockGallery = ({ images }: RockGalleryProps) => {

  return (
    <View paddingHorizontal='m' marginTop='l'>
      <FlatList
        data={images}
        renderItem={({ item }) => <RockImage item={item} />}
      />
    </View>
  );
};

export default RockGallery;
