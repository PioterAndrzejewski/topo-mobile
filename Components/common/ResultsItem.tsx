import React from "react";
import type { FC } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { Text, StyleSheet, TouchableOpacity } from "react-native";

import { styleGuide } from "../../styles/guide";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../types/type";

import {
  resultsStageAtom,
  regionAtom,
  mapAtom,
  selectedRockAtom,
} from "../../store/results";
import { getRegionForZoom } from "../../utils/getRegionForZoom";
import { getZoomFromStage } from "../../utils/getZoomFromStage";
import { AreaData } from "../../services/rocks";

type ListResultProps = {
  id: string;
  name: string;
  item: any;
  isRock?: boolean;
  itemStage: number;
};

const ResultsItem: FC<ListResultProps> = ({
  id,
  name,
  item,
  itemStage,
  isRock,
}) => {
  const map = useAtomValue(mapAtom);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const setSelectedRock = useSetAtom(selectedRockAtom);

  const animateTo = (item: AreaData, stage: number) => {
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
      if (isRock) setSelectedRock(item.attributes.uuid);
    });
  };

  const handlePress = () => {
    animateTo(item, isRock ? itemStage - 1 : itemStage);
    if (isRock) setSelectedRock(id);
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
    marginBottom: 8,
    borderWidth: 0.4,
    borderColor: "black",
    borderRadius: 12,
    padding: 8,
  },
  text: {
    ...styleGuide.text.body,
    color: "#336383",
  },
});
