import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, LayoutAnimation } from "react-native";
import Animated, { Layout } from "react-native-reanimated";

import ResultsList from "../Components/home/ResultsList";
import Map from "../Components/home/Map";
import FilterBar from "../Components/Search/FilterBar";
import { useAtomValue } from "jotai";
import { searchTextAtom } from "../store/search";
import { useAreas } from "../hooks/useAreas";

import { RegionData, RockData } from "../services/rocks";
import ResultsItem from "../Components/common/ResultsItem";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SearchScreen() {
  const { areas, regions, sectors, rocks } = useAreas();
  const [foundRegions, setFoundRegions] = useState<RegionData[]>([]);
  const [foundSectors, setFoundSectors] = useState<RegionData[]>([]);
  const [foundRocks, setFoundRocks] = useState<RockData[]>([]);
  const [rocksExpanded, setRocksExpanded] = useState(true);
  const [sectorsExpanded, setSectorsExpanded] = useState(true);
  const [regionsExpanded, setRegionsExpanded] = useState(true);
  const searchText = useAtomValue(searchTextAtom);

  useEffect(() => {
    setFoundRegions(
      regions?.filter((region) =>
        region.attributes.Name.includes(searchText),
      ) || [],
    );
    setFoundSectors(
      sectors?.filter((sector) =>
        sector.attributes.Name.includes(searchText),
      ) || [],
    );
    setFoundRocks(
      rocks?.filter((rock) =>
        rock.attributes.Name.toLowerCase().includes(searchText.toLowerCase()),
      ) || [],
    );
  }, [searchText, areas, regions, sectors, rocks]);

  const handleExpansion = (section: "rocks" | "sectors" | "regions") => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    if (section === "rocks") setRocksExpanded((prev) => !prev);
    if (section === "sectors") setSectorsExpanded((prev) => !prev);
    if (section === "regions") setRegionsExpanded((prev) => !prev);
  };

  if (searchText.trim() === "") {
    return <Text>Czego szukasz?</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.resultsContainer}>
        <TouchableOpacity onPress={() => handleExpansion("rocks")}>
          <View style={styles.titleContainer}>
            <Text>Skały</Text>
          </View>
        </TouchableOpacity>
        {foundRocks.length < 1 && <Text>Brak skał dla szukanej frazy</Text>}
        {foundRocks.length > 0 && rocksExpanded && (
          <Animated.FlatList
            data={foundRocks}
            renderItem={({ item }) => (
              <ResultsItem
                name={item.attributes.Name}
                item={item}
                itemStage={3}
                isRock
                id={item.attributes.uuid}
                key={item.attributes.uuid}
              />
            )}
          />
        )}
      </View>

      <View style={styles.resultsContainer}>
        <TouchableOpacity onPress={() => handleExpansion("sectors")}>
          <View style={styles.titleContainer}>
            <Text>Sektory</Text>
          </View>
        </TouchableOpacity>
        {foundSectors.length < 1 && (
          <Text>Brak sektorów dla szukanej frazy</Text>
        )}
        {foundSectors.length > 0 && sectorsExpanded && (
          <Animated.FlatList
            data={foundSectors}
            renderItem={({ item }) => (
              <ResultsItem
                name={item.attributes.Name}
                item={item}
                itemStage={2}
                id={item.attributes.uuid}
                key={item.attributes.uuid}
              />
            )}
          />
        )}
      </View>

      <View style={styles.resultsContainer}>
        <TouchableOpacity onPress={() => handleExpansion("regions")}>
          <View style={styles.titleContainer}>
            <Text>Regiony</Text>
          </View>
        </TouchableOpacity>
        {foundRegions.length < 1 && (
          <Text>Brak regionów dla szukanej frazy</Text>
        )}
        {foundRegions.length > 0 && regionsExpanded && (
          <Animated.FlatList
            data={foundRegions}
            renderItem={({ item }) => (
              <ResultsItem
                name={item.attributes.Name}
                item={item}
                itemStage={1}
                id={item.attributes.uuid}
                key={item.attributes.uuid}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    shadowOffset: { width: 0, height: -20 },
    shadowRadius: 0,
    shadowColor: "#000",
    shadowOpacity: 0,
    columnGap: 12,
  },
  resultsContainer: {
    marginVertical: 6,
    backgroundColor: "#fff",
  },
  titleContainer: {
    alignItems: "flex-end",
    paddingVertical: 10,
  },
  listElement: {
    borderWidth: 1,
  },
});
