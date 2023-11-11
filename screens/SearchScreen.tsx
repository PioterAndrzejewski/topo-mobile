import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import ResultsList from "../Components/home/ResultsList";
import Map from "../Components/home/Map";
import FilterBar from "../Components/Search/FilterBar";
import { useAtomValue } from "jotai";
import { searchTextAtom } from "../store/search";

export default function SearchScreen() {
  const [resultsMode, setResultsMode] = useState<"rocks" | "areas">("rocks");
  const searchText = useAtomValue(searchTextAtom);

  useEffect(() => {
    console.log(searchText);
  }, [searchText]);

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item }) => <View style={styles.listElement} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: -20 },
    shadowRadius: 0,
    shadowColor: "#000",
    shadowOpacity: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 12,
  },
  icon: {
    borderWidth: 1,
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  inputContainer: {
    height: 40,
    width: "60%",
    borderColor: "#000",
    borderWidth: 1,
    padding: 6,
    justifyContent: "center",
    borderRadius: 16,
  },
  listElement: {
    height: 60,
    borderWidth: 1,
  },
});
