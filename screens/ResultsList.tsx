import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { useQuery } from "@tanstack/react-query";

import ScreenTitle from "../Components/common/ScreenTitle";
import BackArrow from "../Components/common/BackArrow";
import PrettyJson from "../Components/helpers/PrettyJson";
import ResultsItem from "../Components/common/ResultsItem";

import { Props } from "../types/type";
import { styleGuide } from "../styles/guide";
import { useAreas } from "../hooks/useAreas";

export type CurrentItem = {
  name: string;
  id: string | null;
};

const emptyCurrentObject = {
  id: null,
  name: "Wybierz obszar",
};

export default function ResultsList({ route, navigation }: Props) {
  const [stage, setStage] = useState(0);
  const [currentItem, setCurrentItem] =
    useState<CurrentItem>(emptyCurrentObject);
  const [listToRender, setListToRender] = useState<any[]>([]);
  const { areas, regions, sectors, rocks, isLoading } = useAreas();

  useEffect(() => {
    console.log("current item:");
    console.log(currentItem);
  }, [currentItem]);

  useEffect(() => {
    console.log(stage);
    if (stage === 0 && areas) return setListToRender(areas);
    if (stage === 1 && regions) return setListToRender(regions);
    if (stage === 2 && sectors) return setListToRender(sectors);
    if (stage === 3 && rocks) return setListToRender(rocks);
  }, [stage, areas, regions, sectors]);

  const handleChange = (step: number, newItem: CurrentItem) => {
    setStage((prevStage) => prevStage + step);
    setCurrentItem(newItem);
  };

  const getParent = () => {
    console.log(stage);
    if (stage === 0 || stage === 1) return { id: null, name: "Wybierz obszar" };
    if (stage === 2) {
      const current = regions?.find(
        (obj) => obj.attributes.uuid === currentItem.id,
      );
      return {
        id: current?.attributes.parent.data.attributes.uuid || "",
        name: current?.attributes.parent.data.attributes.Name || "",
      };
    }
    if (stage === 3) {
      console.log("no wywoluje dobry kejs");
      const current = sectors?.find(
        (obj) => obj.attributes.uuid === currentItem.id,
      );
      return {
        id: current?.attributes.parent.data.attributes.uuid || "",
        name: current?.attributes.parent.data.attributes.Name || "",
      };
    }
    if (stage === 4) {
      const current = rocks?.find(
        (obj) => obj.attributes.uuid === currentItem.id,
      );
      return {
        id: current?.attributes.parent.data.attributes.uuid || "",
        name: current?.attributes.parent.data.attributes.Name || "",
      };
    }
    return emptyCurrentObject;
  };

  return (
    <View style={styles.container}>
      <ScreenTitle title={currentItem.name} />
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
      <ScrollView>
        <PrettyJson json={listToRender} />
      </ScrollView>
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
