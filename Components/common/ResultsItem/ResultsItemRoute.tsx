import React from "react";
import type { FC } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

import { styleGuide } from "../../../styles/guide";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../../types/type";

import {
  resultsStageAtom,
  regionAtom,
  mapAtom,
  selectedRockAtom,
} from "../../../store/results";
import { getRegionForZoom } from "../../../utils/getRegionForZoom";
import { getZoomFromStage } from "../../../utils/getZoomFromStage";
import { AreaData } from "../../../services/rocks";
import { Coordinates, Route } from "../../../services/rocks";
import { getMeaningfulGrade } from "../../../utils/language/getMeaningfulGrade";

export type RouteWithParent = Route & {
  parent: {
    name: string;
    coordinates: Coordinates;
    id: string;
  };
};

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
});
