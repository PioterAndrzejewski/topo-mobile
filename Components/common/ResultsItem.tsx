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
  animateTo: (item: AreaData, stage: number) => void;
  itemStage: number;
};

const ResultsItem: FC<ListResultProps> = ({
  id,
  name,
  item,
  animateTo,
  itemStage,
  isRock,
}) => {
  const map = useAtomValue(mapAtom);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const setSelectedRock = useSetAtom(selectedRockAtom);

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
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
    padding: 20,
  },
  text: {
    ...styleGuide.text.heading["2"],
    color: "#336383",
  },
});
