import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView, Text } from "react-native";
import { useAtom } from "jotai";

import ScreenTitle from "../../Components/common/ScreenTitle";
import BackArrow from "../../Components/common/BackArrow";
import ResultsItem from "../../Components/common/ResultsItem";

import { useAreas } from "../../hooks/useAreas";
import {
  AreaData,
  RegionData,
  RockData,
  SectorData,
} from "../../services/rocks";
import { CurrentResultsListItem } from "../../types/common";
import { emptyCurrentObject } from "../../store/results";

import { resultsStageAtom } from "../../store/results";
import { resultsCurrentItemAtom } from "../../store/results";

type ResultsListProps = {
  onScroll: () => void;
};

export default function ResultsList({ onScroll }: ResultsListProps) {
  const [results, setResults] = useAtom(resultsStageAtom);
  const [currentItem, setCurrentItem] = useAtom(resultsCurrentItemAtom);
  const [listToRender, setListToRender] = useState<any[]>([]);
  const { areas, regions, sectors, rocks, isLoading } = useAreas();

  useEffect(() => {
    console.log(results);
    if (results === 0 && areas) return setListToRender(areas);
    if (results === 1 && regions) {
      const regionsToRender = regions.filter(
        (region) =>
          region.attributes.parent.data.attributes.uuid === currentItem.id,
      );
      return setListToRender(regionsToRender);
    }
    if (results === 2 && sectors) {
      const sectorsToRender = sectors.filter(
        (sector) =>
          sector.attributes.parent.data.attributes.uuid === currentItem.id,
      );
      return setListToRender(sectorsToRender);
    }
    if (results === 3 && rocks) {
      const rocksToRender = rocks.filter(
        (rock) =>
          rock.attributes.parent.data.attributes.uuid === currentItem.id,
      );
      return setListToRender(rocksToRender);
    }
  }, [results, areas, regions, sectors]);

  const handleChange = (step: number, newItem: CurrentResultsListItem) => {
    setResults((prevStage) => prevStage + step);
    setCurrentItem(newItem);
  };

  const getCurrent = () => {
    if (results === 1)
      return areas?.find((obj) => obj.attributes.uuid === currentItem.id);
    if (results === 2)
      return regions?.find((obj) => obj.attributes.uuid === currentItem.id);
    if (results === 3)
      return sectors?.find((obj) => obj.attributes.uuid === currentItem.id);
  };

  const getParent = () => {
    if (results === 0 || results === 1) return emptyCurrentObject;
    const current = getCurrent() as AreaData &
      RegionData &
      SectorData &
      RockData;
    if (!current || !current.attributes || !current.attributes.parent)
      return emptyCurrentObject;
    return {
      id: current.attributes.parent
        ? current?.attributes.parent!.data.attributes.uuid
        : "",
      name: current.attributes.parent.data.attributes.Name || "",
    };
  };

  return (
    <View style={styles.container}>
      <ScreenTitle title={currentItem.name || "Wybierz obszar"} />
      {results > 0 && (
        <BackArrow onClick={() => handleChange(-1, getParent())} />
      )}
      <SafeAreaView>
        {listToRender.length < 1 ? (
          <Text>Brakuje wyników. Musisz je pobrać w trybie offline!</Text>
        ) : (
          <ScrollView onScroll={onScroll}>
            {!isLoading &&
              Array.isArray(listToRender) &&
              listToRender.map((item) => {
                return (
                  <ResultsItem
                    id={item.attributes.uuid}
                    name={item.attributes.Name}
                    onChange={handleChange}
                    key={item.attributes.uuid}
                    isRock={results === 3}
                  />
                );
              })}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
});
