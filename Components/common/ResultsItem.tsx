import React, { useMemo, FC } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

import RouteStructure from "./RouteStructure";

import { mapAtom, selectedRockAtom } from "../../store/results";
import { getRegionForZoom } from "../../utils/getRegionForZoom";
import { getZoomFromStage } from "../../utils/getZoomFromStage";
import { AreaData } from "../../services/rocks";
import { useAreas } from "../../hooks/useAreas";
import { getRoutesFromRock } from "../../utils/getRoutesFromRock";
import { getRoutesFromSector } from "../../utils/getRoutesFromSector";
import { styleGuide } from "../../styles/guide";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../types/type";

type ListResultProps = {
  id: string;
  name: string;
  item: any;
  isRock?: boolean;
  isSector?: boolean;
  itemStage: number;
};

const ResultsItem: FC<ListResultProps> = ({
  id,
  name,
  item,
  itemStage,
  isRock,
  isSector,
}) => {
  const { rocks } = useAreas();
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

  const routes = useMemo(() => {
    if (isRock) return getRoutesFromRock(item);
    if (isSector && rocks) return getRoutesFromSector(item, rocks);
  }, [id]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      {(isRock || isSector) && routes && <RouteStructure routes={routes} />}
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
