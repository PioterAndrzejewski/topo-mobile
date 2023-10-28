import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ScreenTitle from "../../Components/common/ScreenTitle";
import BackArrow from "../../Components/common/BackArrow";
import ResultsItem from "../../Components/common/ResultsItem";

import { HomeScreenNavigationProp } from "../../types/type";
import { styleGuide } from "../../styles/guide";
import { useAreas } from "../../hooks/useAreas";
import {
  AreaData,
  RegionData,
  RockData,
  SectorData,
} from "../../services/rocks";

export type CurrentItem = {
  name: string;
  id: string | null;
};

const emptyCurrentObject = {
  id: null,
  name: "Wybierz obszar",
};

type ResultsListProps = {
  onScroll: () => void;
};

export default function ResultsList({ onScroll }: ResultsListProps) {
  const [stage, setStage] = useState(0);
  const [currentItem, setCurrentItem] =
    useState<CurrentItem>(emptyCurrentObject);
  const [listToRender, setListToRender] = useState<any[]>([]);
  const { areas, regions, sectors, rocks, isLoading } = useAreas();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    console.log(stage);
    if (stage === 0 && areas) return setListToRender(areas);
    if (stage === 1 && regions) {
      const regionsToRender = regions.filter(
        (region) =>
          region.attributes.parent.data.attributes.uuid === currentItem.id,
      );
      return setListToRender(regionsToRender);
    }
    if (stage === 2 && sectors) {
      const sectorsToRender = sectors.filter(
        (sector) =>
          sector.attributes.parent.data.attributes.uuid === currentItem.id,
      );
      return setListToRender(sectorsToRender);
    }
    if (stage === 3 && rocks) {
      const rocksToRender = rocks.filter(
        (rock) =>
          rock.attributes.parent.data.attributes.uuid === currentItem.id,
      );
      return setListToRender(rocksToRender);
    }
  }, [stage, areas, regions, sectors]);

  const handleChange = (step: number, newItem: CurrentItem) => {
    if (stage === 3) return navigation.navigate("Rock");
    console.log(`stage: ${stage}, step: ${step}`);
    setStage((prevStage) => prevStage + step);
    setCurrentItem(newItem);
  };

  const getCurrent = () => {
    if (stage === 1)
      return areas?.find((obj) => obj.attributes.uuid === currentItem.id);
    if (stage === 2)
      return regions?.find((obj) => obj.attributes.uuid === currentItem.id);
    if (stage === 3)
      return sectors?.find((obj) => obj.attributes.uuid === currentItem.id);
  };

  const getParent = () => {
    if (stage === 0 || stage === 1) return emptyCurrentObject;
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
      {stage > 0 && <BackArrow onClick={() => handleChange(-1, getParent())} />}
      <SafeAreaView>
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
                />
              );
            })}
        </ScrollView>
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
