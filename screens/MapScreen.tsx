import React from "react";
import { View } from "react-native";
import { Provider } from "jotai";

import ResultsList from "../Components/home/ResultsList";
import Map from "../Components/home/Map";
import FilterBar from "../Components/Search/FilterBar";

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Map />
      <ResultsList />
    </View>
  );
}
