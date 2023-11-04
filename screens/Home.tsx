import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useAtom, Provider } from "jotai";

import ResultsList from "../Components/home/ResultsList";
import Map from "../Components/home/Map";

import { styleGuide } from "../styles/guide";

export default function Home() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "35%", "90%"], []);
  return (
    <Provider>
      <View style={styles.container}>
        <Map />
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          style={styleGuide.bottomSheet}
        >
          <ResultsList onScroll={() => bottomSheetRef.current?.expand()} />
        </BottomSheet>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: styleGuide.color.white,
    flex: 1,
  },
});
