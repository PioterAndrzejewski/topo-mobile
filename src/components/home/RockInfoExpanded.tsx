import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import RouteStructure from "../common/RouteStructure";

import { useAreas } from "src/hooks/useAreas";
import { RockData } from "src/services/rocks";
import { selectedRockAtom } from "src/store/results";
import { HomeScreenNavigationProp } from "src/types/type";
import { getRoutesFromRock } from "src/utils/getRoutesFromRock";

const RockInfoExpanded = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedRock, setSelectedRock] = useAtom(selectedRockAtom);
  const { rocks } = useAreas();

  const rock = useMemo(
    () =>
      rocks?.find((rock: RockData) => rock.attributes.uuid === selectedRock),
    [selectedRock],
  );

  const routes = useMemo(() => rock && getRoutesFromRock(rock), [rock]);

  const handleOpenRock = () => {
    navigation.navigate("Rock", {
      id: selectedRock,
    });
    setSelectedRock(null);
  };

  return (
    <View style={styles.container}>
      <Text>{rock?.attributes.Name}</Text>
      {routes && <RouteStructure routes={routes} />}
      <TouchableOpacity onPress={handleOpenRock}>
        <Text>Otwórz skałoplan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 12,
    shadowOffset: { width: 0, height: -20 },
    shadowRadius: 0,
    shadowColor: "#000",
    shadowOpacity: 0,
    rowGap: 12,
  },
  resultsContainer: {
    marginVertical: 6,
    backgroundColor: "#fff",
  },
});

export default RockInfoExpanded;
