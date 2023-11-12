import React from "react";
import { View, Text } from "react-native";
import { Provider } from "jotai";

import FilterBar from "../components/search/FilterBar";

export default function SearchScreen() {
  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <Text>Fejworitys</Text>
      </View>
    </Provider>
  );
}
