import { useNavigation } from "@react-navigation/native";
import { useAtomValue, useSetAtom } from "jotai";
import { FC, useMemo } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

import RouteStructure from "src/components/common/RouteStructure";
import InformationRow from "src/components/rock/details/InformationRow";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useImageFile } from "src/hooks/useImageFile";
import { RockData } from "src/services/rocks";
import { mapAtom, selectedRockAtom } from "src/store/results";
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
    });
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
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <ImageBackground
        source={{
          uri: image || "",
        }}
        resizeMode='cover'
        style={styles.background}
      >
        <View p='m' gap='m'>
          <View style={styles.row}>
            <Text variant='h2'>{name}</Text>
            <TouchableOpacity hitSlop={12} onPress={handleHeartPress}>
              <HeartIcon size={32} fill={isFavorite ? "#f00" : "#fff"} />
            </TouchableOpacity>
          </View>
          {item && <InformationRow rock={item} />}
          {routes && <RouteStructure routes={routes} />}
          <View alignSelf='flex-end'>
            <Text
              variant='h3'
              additionalStyles={styles.author}
            >{`Autor: ${item.attributes.cover.Author}`}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default RockResultsItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    rowGap: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
  },
  background: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  author: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});
