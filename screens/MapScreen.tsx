import React from "react";
import { View } from "react-native";
import { Provider } from "jotai";

import ResultsList from "../components/home/ResultsList";
import Map from "../components/home/Map";
import FilterBar from "../components/home/FilterBar";

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Map />
      <ResultsList />
    </View>
  );
}
