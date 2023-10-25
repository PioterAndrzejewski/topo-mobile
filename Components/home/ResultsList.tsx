import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";

import ScreenTitle from "../../Components/common/ScreenTitle";
import BackArrow from "../../Components/common/BackArrow";
import PrettyJson from "../../Components/helpers/PrettyJson";
import ResultsItem from "../../Components/common/ResultsItem";
import Map from "./Map";

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

export default function ResultsList() {
  const [stage, setStage] = useState(0);
  const [currentItem, setCurrentItem] =
    useState<CurrentItem>(emptyCurrentObject);
  const [listToRender, setListToRender] = useState<any[]>([]);
  const { areas, regions, sectors, rocks, isLoading } = useAreas();

  useEffect(() => {
    if (stage === 0 && areas) return setListToRender(areas);
    if (stage === 1 && regions) return setListToRender(regions);
    if (stage === 2 && sectors) return setListToRender(sectors);
    if (stage === 3 && rocks) return setListToRender(rocks);
  }, [stage, areas, regions, sectors]);

  const handleChange = (step: number, newItem: CurrentItem) => {
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
    if (stage === 4)
      return rocks?.find((obj) => obj.attributes.uuid === currentItem.id);
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
        <ScrollView>
          {!isLoading &&
            Array.isArray(listToRender) &&
            listToRender.map((item) => {
              console.log(item);
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
    backgroundColor: styleGuide.color.primary["200"],
  },
});
