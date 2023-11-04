import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView, Text } from "react-native";
import { useAtom, useAtomValue, useStore } from "jotai";
import Animated from "react-native-reanimated";

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

import { resultsStageAtom, listToRenderAtom } from "../../store/results";

type ResultsListProps = {
  onScroll: () => void;
};

export default function ResultsList({ onScroll }: ResultsListProps) {
  const listToRender = useAtomValue(listToRenderAtom);

  return (
    <View style={styles.container}>
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
    paddingTop: 24,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
});
