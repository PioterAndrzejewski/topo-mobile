import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  ScrollView,
} from "react-native";
import Animated from "react-native-reanimated";

import { useAtomValue } from "jotai";
import { searchTextAtom } from "../store/search";
import { useAreas } from "../hooks/useAreas";

import { Coordinates, RegionData, RockData, Route } from "../services/rocks";
import ResultsItem from "../components/common/ResultsItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RouteWithParent } from "../components/search/ResultsItemRock";
import ResultsItemRock from "../components/search/ResultsItemRock";

const searchForRoutes = (rocks: RockData[], searchText: string) => {
  let routesFound: RouteWithParent[] = [];
  console.log(searchText);
  rocks.forEach((rock) => {
    const routesInRock = rock.attributes.routes.data.filter((route) => {
      console.log(rock);
      return route.attributes.display_name.toLowerCase().includes(searchText);
    });
    const routesInRockWithParent: RouteWithParent[] = routesInRock.map(
      (route) => ({
        ...route,
        parent: {
          name: rock.attributes.Name,
          coordinates: rock.attributes.coordinates,
        },
      }),
    );
    routesFound = [...routesFound, ...routesInRockWithParent];
  });
  return routesFound;
};

export default function SearchScreen() {
  const { areas, regions, sectors, rocks } = useAreas();
  const [foundRoutes, setFoundRoutes] = useState<RouteWithParent[]>([]);
  const [foundRegions, setFoundRegions] = useState<RegionData[]>([]);
  const [foundSectors, setFoundSectors] = useState<RegionData[]>([]);
  const [foundRocks, setFoundRocks] = useState<RockData[]>([]);
  const [routesExpanded, setRoutesExpanded] = useState(true);
  const [rocksExpanded, setRocksExpanded] = useState(true);
  const [sectorsExpanded, setSectorsExpanded] = useState(true);
  const [regionsExpanded, setRegionsExpanded] = useState(true);
  const searchText = useAtomValue(searchTextAtom);

  useEffect(() => {
    if (searchText.length < 1) return;
    setFoundRegions(
      regions?.filter((region) =>
        region.attributes.Name.toLowerCase().includes(searchText),
      ) || [],
    );
    setFoundSectors(
      sectors?.filter((sector) =>
        sector.attributes.Name.toLowerCase().includes(searchText),
      ) || [],
    );
    setFoundRocks(
      rocks?.filter((rock) =>
        rock.attributes.Name.toLowerCase().includes(searchText),
      ) || [],
    );
    if (rocks) setFoundRoutes(searchForRoutes(rocks, searchText));
  }, [searchText, areas, regions, sectors, rocks]);

  const handleExpansion = (
    section: "routes" | "rocks" | "sectors" | "regions",
  ) => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 200,
    });
    if (section === "routes") setRoutesExpanded((prev) => !prev);
    if (section === "rocks") setRocksExpanded((prev) => !prev);
    if (section === "sectors") setSectorsExpanded((prev) => !prev);
    if (section === "regions") setRegionsExpanded((prev) => !prev);
  };

  if (searchText === "") {
    return (
      <View style={styles.container}>
        <Text>Czego szukasz?</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.resultsContainer}>
        <TouchableOpacity onPress={() => handleExpansion("routes")}>
          <View style={styles.titleContainer}>
            <Text>Drogi</Text>
          </View>
        </TouchableOpacity>
        {foundRoutes.length < 1 && <Text>Brak dróg dla szukanej frazy</Text>}
        {foundRoutes.length > 0 && routesExpanded && (
          <Animated.FlatList
            scrollEnabled={false}
            data={foundRoutes.slice(0, 8)}
            renderItem={({ item }) => (
              <ResultsItemRock
                name={item.attributes.display_name}
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
        <TouchableOpacity onPress={() => handleExpansion("rocks")}>
          <View style={styles.titleContainer}>
            <Text>Skały</Text>
          </View>
        </TouchableOpacity>
        {foundRocks.length < 1 && <Text>Brak skał dla szukanej frazy</Text>}
        {foundRocks.length > 0 && rocksExpanded && (
          <Animated.FlatList
            scrollEnabled={false}
            data={foundRocks.slice(0, 8)}
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
        {foundRocks.length > 8 && (
          <Text>Mamy tego więcej, ale wyświetlono tylko 8 wyników.</Text>
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
            data={foundSectors.slice(0, 8)}
            scrollEnabled={false}
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
        {foundRocks.length > 8 && (
          <Text>Mamy tego więcej, ale wyświetlono tylko 8 wyników.</Text>
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
            scrollEnabled={false}
            data={foundRegions.slice(0, 8)}
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
      {foundRocks.length > 8 && (
        <Text>Mamy tego więcej, ale wyświetlono tylko 8 wyników.</Text>
      )}
      <View style={styles.dummy} />
    </ScrollView>
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
  dummy: {
    height: 50,
    backgroundColor: "#fff",
  },
});
