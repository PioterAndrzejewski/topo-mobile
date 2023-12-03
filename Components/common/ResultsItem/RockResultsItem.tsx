import React, { useMemo, FC } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import RouteStructure from "../RouteStructure";

import { mapAtom, selectedRockAtom } from "../../../store/results";
import { getRegionForZoom } from "../../../utils/getRegionForZoom";
import { getZoomFromStage } from "../../../utils/getZoomFromStage";
import { RockData } from "../../../services/rocks";
import { getRoutesFromRock } from "../../../utils/getRoutesFromRock";
import { styleGuide } from "../../../styles/guide";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../../types/type";

type ListResultProps = {
  id: string;
  name: string;
  item: RockData;
};

const RockResultsItem: FC<ListResultProps> = ({ id, name, item }) => {
  const map = useAtomValue(mapAtom);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const setSelectedRock = useSetAtom(selectedRockAtom);

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

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.text}>{name}</Text>
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
  text: {
    ...styleGuide.text.heading["3"],
    color: "#336383",
  },
});
