import { useState, useMemo } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import { FavoriteType } from "../services/storeAsync";
import Switcher from "../components/common/Switcher";

const options: { value: FavoriteType; label: string }[] = [
  {
    value: "done",
    label: "zrobione",
  },
  {
    value: "project",
    label: "projekt",
  },
  {
    value: "other",
    label: "inne",
  },
];

export default function SearchScreen() {
  const [section, setSection] = useState<FavoriteType>("done");

  return (
    <View style={styles.container}>
      <Switcher onPress={setSection} active={section} options={options} />
      <ScrollView></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
});
