import { useNavigation } from "@react-navigation/native";
import { useAtomValue, useSetAtom } from "jotai";
import { FC } from "react";
import { TouchableOpacity } from "react-native";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { AreaData } from "src/services/rocks";
import {
  bottomSheetRefAtom,
  mapAtom,
  selectedRockAtom,
} from "src/store/results";
import { styleGuide } from "src/styles/theme";
import { HomeScreenNavigationProp } from "src/types/type";
import { getRegionForZoom } from "src/utils/getRegionForZoom";
import { getZoomFromStage } from "src/utils/getZoomFromStage";

type ListResultProps = {
  id: string;
  name: string;
  item: AreaData;
};

const ResultsItem: FC<ListResultProps> = ({ id, name, item }) => {
  const map = useAtomValue(mapAtom);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const resultsBottomSheet = useAtomValue(bottomSheetRefAtom);
  const setSelectedRock = useSetAtom(selectedRockAtom);

  const animateTo = () => {
    navigation.navigate("Map");
    const newRegion = getRegionForZoom(
      item.attributes.coordinates.latitude,
      item.attributes.coordinates.longitude,
      getZoomFromStage(2),
    );
    setTimeout(() => {
      if (map && map.current) {
        map.current.animateToRegion(newRegion);
      }
      setSelectedRock(null);
      resultsBottomSheet?.current?.snapToIndex(0);
    }, 100);
  };

  return (
    <TouchableOpacity onPress={animateTo}>
      <View
        rowGap='2xl'
        marginBottom='s'
        padding='s'
        {...styleGuide.cardShadow}
        gap='s'
      >
        <Text variant='h2' color='textGray'>
          {name}
        </Text>
        <View>
          <Text variant='h3' color='textSecondary'>
            {item.attributes.parent.data.attributes.Name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ResultsItem;
