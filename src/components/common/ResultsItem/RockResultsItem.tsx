import { useMemo, FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAtomValue, useSetAtom } from "jotai";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

import RouteStructure from "src/components/common/RouteStructure";

import { mapAtom, selectedRockAtom } from "src/store/results";
import { getRegionForZoom } from "src/utils/getRegionForZoom";
import { getZoomFromStage } from "src/utils/getZoomFromStage";
import { RockData } from "src/services/rocks";
import { getRoutesFromRock } from "src/utils/getRoutesFromRock";
import { styleGuide } from "src/styles/guide";

import { HomeScreenNavigationProp } from "src/types/type";
import { HeartIcon } from "src/components/icons/Heart";
import { useFavoriteContext } from "src/context/FavoritesContext";

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
      <View style={styles.row}>
        <Text style={styles.text}>{name}</Text>
        <TouchableOpacity hitSlop={12} onPress={handleHeartPress}>
          <HeartIcon size={24} fill={isFavorite ? "#f00" : "#fff"} />
        </TouchableOpacity>
      </View>
      {routes && <RouteStructure routes={routes} />}
    </TouchableOpacity>
  );
};

export default RockResultsItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    rowGap: 47,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
    padding: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    ...styleGuide.text.heading["3"],
    color: "#336383",
  },
});
