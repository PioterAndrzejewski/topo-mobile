import type { FC } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { useAtomValue, useSetAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";

import { styleGuide } from "src/styles/guide";

import { HomeScreenNavigationProp } from "src/types/type";

import { mapAtom, selectedRockAtom } from "src/store/results";
import { getRegionForZoom } from "src/utils/getRegionForZoom";
import { getZoomFromStage } from "src/utils/getZoomFromStage";
import { Coordinates, Route } from "src/services/rocks";
import { getMeaningfulGrade } from "src/utils/language/getMeaningfulGrade";
import { HeartIcon } from "src/components/icons/Heart";
import { useFavoriteContext } from "src/context/FavoritesContext";
import { getFavoriteColor } from "src/utils/getFavoriteColor";

export type RoutesParent = {
  name: string;
  coordinates: Coordinates;
  id: string;
};

export type RouteWithParent = Route & { parent: RoutesParent };

type ListResultProps = {
  id: string;
  name: string;
  item: RouteWithParent;
  isRock?: boolean;
  itemStage: number;
};

const ResultsItemRoute: FC<ListResultProps> = ({
  id,
  name,
  item,
  itemStage,
  isRock,
}) => {
  const map = useAtomValue(mapAtom);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const setSelectedRock = useSetAtom(selectedRockAtom);
  const {
    checkRouteInFavorites,
    removeRouteFromFavorites,
    setRouteAsFavorite,
  } = useFavoriteContext();
  const isFavorite = checkRouteInFavorites(id);

  const animateTo = (item: RouteWithParent) => {
    navigation.navigate("Map");
    const newRegion = getRegionForZoom(
      item?.parent?.coordinates?.latitude,
      item?.parent?.coordinates?.longitude,
      getZoomFromStage(3),
    );
    setTimeout(() => {
      if (map && map.current) {
        map.current.animateToRegion(newRegion);
      }
      if (isRock) setSelectedRock(item.parent.id);
    });
  };

  const handlePress = () => {
    animateTo(item);
    if (isRock) setSelectedRock(id);
  };

  const handleHeartPress = () => {
    if (isFavorite) removeRouteFromFavorites(item);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.gradeContainer}>
        <Text style={styles.grade}>
          {getMeaningfulGrade(item.attributes.grade)}
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>Skała: {item.parent.name}</Text>
      </View>
      {isFavorite && (
        <TouchableOpacity
          style={styles.heartContainer}
          onPress={handleHeartPress}
          hitSlop={12}
        >
          <HeartIcon size={24} fill={getFavoriteColor(isFavorite)} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default ResultsItemRoute;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
    padding: 8,
    alignItems: "center",
  },
  gradeContainer: {
    flexBasis: 44,
    borderRightWidth: 1,
  },
  grade: {
    ...styleGuide.text.heading["3"],
  },
  descriptionContainer: {
    marginLeft: 20,
  },
  text: {
    ...styleGuide.text.body,
    color: "#336383",
  },
  heartContainer: { flex: 1, flexDirection: "row", justifyContent: "flex-end" },
});
