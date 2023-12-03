import React, { useMemo, FC } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import RouteStructure from "../RouteStructure";

import { mapAtom, selectedRockAtom } from "../../../store/results";
import { getRegionForZoom } from "../../../utils/getRegionForZoom";
import { getZoomFromStage } from "../../../utils/getZoomFromStage";
import { RockData, AreaData } from "../../../services/rocks";
import { getRoutesFromRock } from "../../../utils/getRoutesFromRock";
import { styleGuide } from "../../../styles/guide";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../../types/type";

type ListResultProps = {
  id: string;
  name: string;
  item: AreaData;
};

const ResultsItem: FC<ListResultProps> = ({ id, name, item }) => {
  const map = useAtomValue(mapAtom);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const setSelectedRock = useSetAtom(selectedRockAtom);

  const animateTo = (item: AreaData) => {
    navigation.navigate("Map");
    const newRegion = getRegionForZoom(
      item.attributes.coordinates.latitude,
      item.attributes.coordinates.longitude,
      getZoomFromStage(1),
    );
    setTimeout(() => {
      if (map && map.current) {
        map.current.animateToRegion(newRegion);
      }
      setSelectedRock(item.attributes.uuid);
    });
  };

  const handlePress = () => {
    animateTo(item);
    setSelectedRock(id);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ResultsItem;

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
  text: {
    ...styleGuide.text.heading["3"],
    color: "#336383",
  },
});
