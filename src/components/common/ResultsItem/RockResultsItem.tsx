import { TouchableHighlight } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useAtomValue, useSetAtom } from "jotai";
import { FC, useMemo } from "react";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import OverlayCardView from "src/components/ui/OverlayCardView";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { HeartIcon } from "src/components/icons/Heart";
import { useFavoriteContext } from "src/context/FavoritesContext";
import { useImageFile } from "src/hooks/useImageFile";
import { RockData } from "src/services/rocks";
import { confirmActionAtom } from "src/store/global";
import { mapAtom, selectedRockAtom } from "src/store/results";
import { Theme } from "src/styles/theme";
import { HomeScreenNavigationProp } from "src/types/type";
import { getRegionForZoom } from "src/utils/getRegionForZoom";
import { getRoutesFromRock } from "src/utils/getRoutesFromRock";
import { getZoomFromStage } from "src/utils/getZoomFromStage";
import RouteStructure from "../RouteStructure";

type ListResultProps = {
  id: string;
  name: string;
  item: RockData;
};

const RockResultsItem: FC<ListResultProps> = ({ id, name, item }) => {
  const map = useAtomValue(mapAtom);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const setSelectedRock = useSetAtom(selectedRockAtom);
  const { checkRockInFavorites, setRockAsFavorite, removeRockFromFavorite } =
    useFavoriteContext();
  const setConfirmAction = useSetAtom(confirmActionAtom);
  const { colors } = useTheme<Theme>();
  const isFavorite = checkRockInFavorites(item.attributes.uuid);
  const image = useImageFile(
    item?.attributes?.cover[0]?.Photo?.data?.attributes.url || "",
  );
  const animateTo = (item: RockData, stage: number) => {
    if (!item) return;
    navigation.navigate("Map");
    const newRegion = getRegionForZoom(
      item.attributes.coordinates.latitude,
      item.attributes.coordinates.longitude,
      getZoomFromStage(stage),
    );
    setTimeout(() => {
      if (map && map.current) {
        map.current.animateToRegion(newRegion);
      }
      setSelectedRock(item.attributes.uuid);
    }, 100);
  };

  const handlePress = () => {
    animateTo(item, 3);
    setSelectedRock(id);
  };

  const routes = useMemo(() => getRoutesFromRock(item), [item]);

  const handleHeartPress = () => {
    if (!isFavorite) {
      setRockAsFavorite(item);
    } else {
      setConfirmAction({
        confirmFn: () => removeRockFromFavorite(item.attributes.uuid),
        message: `Usuwasz skałę ${item.attributes.Name} z ulubionych`,
      });
    }
  };
  if (!image) return;
  return (
    <TouchableHighlight onPress={handlePress}>
      <View borderRadius={24}>
        {image && (
          <ImageBackground
            source={{
              uri: image || "",
            }}
            resizeMode='cover'
            imageStyle={{
              height: 200,
              borderTopRightRadius: 24,
              borderTopLeftRadius: 24,
            }}
          />
        )}
        <OverlayCardView
          alignSelf='flex-end'
          backgroundColor='backgroundLight'
          top={130}
          right={10}
        >
          <Text variant='caption'>{`zdj: ${item.attributes.cover[0].Author}`}</Text>
        </OverlayCardView>
        <View
          marginTop='6xl'
          paddingHorizontal='m'
          paddingVertical='l'
          gap='xs'
          borderRadius={24}
          backgroundColor='backgroundScreen'
          zIndex={20}
          elevation={20}
        >
          <View
            flexDirection='row'
            justifyContent='space-between'
            marginBottom='m'
          >
            <View>
              <Text variant='h4'>Skała</Text>
              <Text variant='h2'>{name}</Text>
            </View>

            <TouchableOpacity hitSlop={12} onPress={handleHeartPress}>
              <HeartIcon
                size={32}
                fill={isFavorite ? colors.favoriteRed : colors.backgroundScreen}
              />
            </TouchableOpacity>
          </View>
          {routes && <RouteStructure routes={routes} />}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default RockResultsItem;
