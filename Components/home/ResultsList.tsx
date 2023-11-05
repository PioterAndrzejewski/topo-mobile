import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  Text,
  Button,
} from "react-native";
import { useAtom, useAtomValue, useStore } from "jotai";
import Animated from "react-native-reanimated";
import { Region } from "react-native-maps";

import ResultsItem from "../../Components/common/ResultsItem";

import { useAreas } from "../../hooks/useAreas";
import {
  AreaData,
  RegionData,
  RockData,
  SectorData,
} from "../../services/rocks";
import {
  regionAtom,
  resultsStageAtom,
  zoomAtom,
  AreasList,
  listToRenderAtom,
} from "../../store/results";
import { calculateDistance } from "../../utils/calculateDistance";
import { TouchableOpacity } from "react-native-gesture-handler";

type ResultsListProps = {
  onScroll: () => void;
};

const sortAreas = (region: Region, areas: AreasList) => {
  const shallowCopy = [...areas];
  return shallowCopy.sort((a, b) => {
    return (
      calculateDistance(region, a.attributes.coordinates) -
      calculateDistance(region, b.attributes.coordinates)
    );
  });
};

export default function ResultsList({ onScroll }: ResultsListProps) {
  const { areas, regions, sectors, rocks } = useAreas();
  const zoom = useAtomValue(zoomAtom);
  const region = useAtomValue(regionAtom);
  const [stage, setStage] = useAtom(resultsStageAtom);
  const [listToRender, setListToRender] = useAtom(listToRenderAtom);
  const [rocksOnly, setRocksOnly] = useState(false);

  useEffect(() => {
    if (rocksOnly && rocks) return setListToRender(sortAreas(region, rocks));
    if (stage === 0 && areas) return setListToRender(sortAreas(region, areas));
    if (stage === 1 && regions)
      return setListToRender(sortAreas(region, regions));
    if (stage === 2 && sectors)
      return setListToRender(sortAreas(region, sectors));
    if (stage === 3 && rocks) return setListToRender(sortAreas(region, rocks));
  }, [region, rocksOnly]);

  const handleRocksOnlyButton = () => {
    setRocksOnly((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={handleRocksOnlyButton}
          style={
            rocksOnly
              ? { ...styles.buttonContainer, ...styles.buttonContainerActive }
              : {
                  ...styles.buttonContainer,
                }
          }
        >
          <Text>Tylko skały {rocksOnly ? "x" : " "}</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView>
        {listToRender.length < 1 ? (
          <Text>Brakuje wyników. Musisz je pobrać w trybie offline!</Text>
        ) : (
          <Animated.FlatList
            data={listToRender}
            onScroll={onScroll}
            renderItem={({ item }) => (
              <ResultsItem
                id={item.attributes.uuid}
                name={item.attributes.Name}
                key={item.attributes.uuid}
                item={item}
              />
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  controls: {
    marginBottom: 14,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonContainerActive: {
    borderWidth: 2,
  },
});
