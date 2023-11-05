import React from "react";
import type { FC } from "react";
import { useAtom, useAtomValue } from "jotai";

import { Text, StyleSheet, TouchableOpacity } from "react-native";

import { styleGuide } from "../../styles/guide";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../types/type";

import {
  resultsStageAtom,
  regionAtom,
  mapAtom,
} from "../../store/results";
import { getRegionForZoom } from "../../utils/getRegionForZoom";
import { getZoomFromStage } from "../../utils/getZoomFromStage";

type ListResultProps = {
  id: string;
  name: string;
  item: any;
};

const ResultsItem: FC<ListResultProps> = ({ id, name, item }) => {
  const [resultsStage, setResultsStage] = useAtom(resultsStageAtom);
  const [region, setRegion] = useAtom(regionAtom);
  const map = useAtomValue(mapAtom);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const handlePress = () => {
    if (resultsStage === 3) return navigation.navigate("Rock", { id });
    setResultsStage((prev) => prev + 1);
    const newRegion = getRegionForZoom(
      item.attributes.coordinates.latitude,
      item.attributes.coordinates.longitude,
      getZoomFromStage(resultsStage),
    );
    map?.current!.animateToRegion(newRegion);
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
