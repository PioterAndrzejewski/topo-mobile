import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

import ResultsList from "../Components/home/ResultsList";
import Map from "../Components/home/Map";

import { styleGuide } from "../styles/guide";
import { useAreas } from "../hooks/useAreas";
import { AreaData, RegionData, RockData, SectorData } from "../services/rocks";

export default function Home() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "50%", "90%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <View style={styles.container}>
      <Map />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <ResultsList />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: styleGuide.color.primary["200"],
    flex: 1,
  },
});
