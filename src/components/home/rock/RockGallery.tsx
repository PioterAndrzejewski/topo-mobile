import { FlatList } from "react-native-gesture-handler";

import View from "src/components/ui/View";
import Text from 'src/components/ui/Text';

import { Cover } from "src/services/rocks";
import RockImage from "./RockImage";

type RockGalleryProps = {
  images: Cover[];
};

const RockGallery = ({ images }: RockGalleryProps) => {
  return (
    <View paddingHorizontal='m' marginTop='l'>
      <Text variant='h3'>Zdjęcia ze skały:</Text>
      <FlatList
        data={images}
        renderItem={({ item }) => <RockImage item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default RockGallery;
