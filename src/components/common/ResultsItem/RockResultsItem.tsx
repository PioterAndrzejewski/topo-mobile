import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useAtomValue, useSetAtom } from "jotai";
import { FC, useMemo } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";

import OverlayCardView from "src/components/ui/OverlayCardView";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { HeartIcon } from "src/components/icons/Heart";
import { useFavoriteContext } from "src/context/FavoritesContext";
import { useImageFile } from "src/hooks/useImageFile";
import { RockData } from "src/services/rocks";
import { confirmActionAtom } from "src/store/global";
import { mapAtom, selectedRockAtom } from "src/store/results";
import { Theme, styleGuide } from "src/styles/theme";
import { HomeScreenNavigationProp } from "src/types/type";
import { getRegionForZoom } from "src/utils/getRegionForZoom";
import { getZoomFromStage } from "src/utils/getZoomFromStage";

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
    item.attributes.cover[0].Photo.data.attributes.url,
  );
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
    return item.attributes.routes.data.length;
  }, [id]);

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
    <TouchableOpacity onPress={handlePress}>
      <View
        rowGap='l'
        marginBottom='l'
        {...styleGuide.cardShadow}
        borderRadius={24}
      >
        <ImageBackground
          source={{
            uri: image || "",
          }}
          resizeMode='cover'
          imageStyle={{ borderRadius: 24 }}
        >
          <View
            paddingHorizontal='m'
            paddingVertical='xl'
            gap='m'
            borderRadius={24}
          >
            <View gap='2xs'>
              <View flexDirection='row' justifyContent='space-between'>
                <Text
                  variant='h2'
                  additionalStyles={{
                    color: "white",
                    textShadowColor: "rgba(0, 0, 0, 0.85)",
                    textShadowOffset: { width: 2, height: 1 },
                    textShadowRadius: 6,
                    paddingRight: 8,
                    paddingLeft: 4,
                    marginLeft: -4,
                  }}
                >
                  {name}
                </Text>
                <TouchableOpacity hitSlop={12} onPress={handleHeartPress}>
                  <HeartIcon
                    size={32}
                    fill={
                      isFavorite ? colors.favoriteRed : colors.backgroundSecondary
                    }
                  />
                </TouchableOpacity>
              </View>
              <OverlayCardView
                flexDirection='row'
                gap='xs'
                alignSelf='flex-start'
                backgroundColor='backgroundSecondary'
                alignItems='center'
              >
                <Text variant='h4' color='textSecondary'>
                  {item.attributes.parent.data.attributes.Name}
                </Text>
              </OverlayCardView>
            </View>

            <OverlayCardView
              alignSelf='flex-start'
              backgroundColor='backgroundSecondary'
            >
              <Text variant='caption'>{`Liczba dróg: ${
                routes?.toString() || ""
              }`}</Text>
            </OverlayCardView>
            <OverlayCardView
              alignSelf='flex-start'
              backgroundColor='backgroundSecondary'
            >
              <Text variant='caption'>{`zdj: ${item.attributes.cover[0].Author}`}</Text>
            </OverlayCardView>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default RockResultsItem;
