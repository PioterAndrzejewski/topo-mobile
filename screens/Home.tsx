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
  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <Map />
        <ResultsList />
      </View>
    </Provider>
  );
}
