import { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";

import Switcher from "../components/common/Switcher";
import RockFavorites from "../components/favorites/RockFavorites";
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
    console.log("zmieniam mode");
    switch (mode) {
      case "routes":
        return <RouteFavorites />;
      case "rocks":
        return <RockFavorites />;
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
