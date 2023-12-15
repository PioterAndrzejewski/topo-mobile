import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useAtomValue, useSetAtom } from "jotai";
import { FC, useMemo } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";

import RouteStructure from "src/components/common/RouteStructure";
import InformationRow from "src/components/rock/details/InformationRow";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useImageFile } from "src/hooks/useImageFile";
import { RockData } from "src/services/rocks";
import { mapAtom, selectedRockAtom } from "src/store/results";
import { Theme } from "src/styles/theme";
import { getRegionForZoom } from "src/utils/getRegionForZoom";
import { getRoutesFromRock } from "src/utils/getRoutesFromRock";
import { getZoomFromStage } from "src/utils/getZoomFromStage";

import { HeartIcon } from "src/components/icons/Heart";
import { useFavoriteContext } from "src/context/FavoritesContext";
import { HomeScreenNavigationProp } from "src/types/type";

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
  const { colors } = useTheme<Theme>();
  const isFavorite = checkRockInFavorites(item.attributes.uuid);
  const image = useImageFile(item.attributes.cover.Photo.data.attributes.url);
  const animateTo = (item: RockData, stage: number) => {
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

  const routes = useMemo(() => {
    if (!item) return;
    return getRoutesFromRock(item);
  }, [id]);

  const handleHeartPress = () => {
    if (!isFavorite) {
      setRockAsFavorite(item);
    } else {
      removeRockFromFavorite(item.attributes.uuid);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        rowGap='l'
        marginBottom='l'
        shadowOffset={{ width: 0, height: 5 }}
        shadowRadius={4}
        shadowOpacity={0.5}
      >
        <ImageBackground
          source={{
            uri: image || "",
          }}
          resizeMode='cover'
          imageStyle={{ borderRadius: 24 }}
        >
          <View p='m' gap='m' backgroundColor='imageOverlay' borderRadius={24}>
            <View flexDirection='row' justifyContent='space-between'>
              <Text
                variant='h2'
                additionalStyles={{
                  color: "white",
                  textShadowColor: "rgba(0, 0, 0, 0.85)",
                  textShadowOffset: { width: 2, height: 1 },
                  textShadowRadius: 16,
                }}
              >
                {name}
              </Text>
              <TouchableOpacity hitSlop={12} onPress={handleHeartPress}>
                <HeartIcon
                  size={32}
                  fill={
                    isFavorite ? colors.favoriteRed : colors.mainBackgroundFaded
                  }
                />
              </TouchableOpacity>
            </View>
            {item && <InformationRow rock={item} inCard/>}
            {routes && <RouteStructure routes={routes} />}
            <View
              alignSelf='flex-end'
              backgroundColor='mainBackgroundFaded'
              padding='s'
              borderRadius={6}
              shadowOffset={{ width: 0, height: 5 }}
              shadowRadius={4}
              shadowOpacity={0.5}
            >
              <Text variant='caption'>{`zdj: ${item.attributes.cover.Author}`}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default RockResultsItem;
