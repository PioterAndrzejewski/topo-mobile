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
  id: string;
};

export default function ResultsList({ route, navigation }: Props) {
  const [stage, setStage] = useState(0);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [listToRender, setListToRender] = useState<any[]>([]);
  const { areas, regions, sectors, rocks, isLoading } = useAreas();

  useEffect(() => {
    console.log(";w komponencie");
    console.log(rocks);
  }, [rocks]);

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

  return (
    <View style={styles.container}>
      <ScreenTitle title='obszar' />
      {stage > 0 && <BackArrow />}
      <SafeAreaView>
        <ScrollView>
          {!isLoading &&
            Array.isArray(listToRender) &&
            listToRender.map((item) => (
              <ResultsItem
                id={item.uuid}
                name={item.attributes.Name}
                onChange={handleChange}
                key={item.attributes.uuid}
              />
            ))}
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
