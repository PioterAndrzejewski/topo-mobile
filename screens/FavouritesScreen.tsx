import { useState, useMemo } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import Switcher from "../components/common/Switcher";
import RouteFavorites from "../components/favorites/RouteFavorites";

import { SwitcherOption } from "../components/common/Switcher";

const options: SwitcherOption<"routes" | "rocks">[] = [
  {
    value: "routes",
    label: "drogi",
  },
  {
    value: "rocks",
    label: "skały",
  },
];

export default function SearchScreen() {
  const [mode, setMode] = useState<string>("routes");

  const renderFavorites = useMemo(() => {
    switch (mode) {
      case "routes":
        return <RouteFavorites />;
      case "rocks":
        return <Text>No skały tu</Text>;
    }
  }, [mode]);

  return (
    <View style={styles.container}>
      <Switcher onPress={setMode} active={mode} options={options} />
      {renderFavorites}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    gap: 12,
  },
});
