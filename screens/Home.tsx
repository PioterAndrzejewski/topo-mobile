import React from "react";
import { View } from "react-native";
import { Provider } from "jotai";

import ResultsList from "../Components/home/ResultsList";
import Map from "../Components/home/Map";
import FilterBar from "../Components/home/Search/FilterBar";

import { styleGuide } from "../styles/guide";

export default function Home() {
  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <FilterBar />
        <Map />
        <ResultsList />
      </View>
    </Provider>
  );
}
