import React from "react";
import { View, Text } from "react-native";
import { Provider } from "jotai";

import FilterBar from "../Components/Search/FilterBar";

export default function SearchScreen() {
  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <FilterBar />
        <Text>Fejworitys</Text>
      </View>
    </Provider>
  );
}
