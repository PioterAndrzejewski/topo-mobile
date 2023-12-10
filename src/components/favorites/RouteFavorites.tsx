import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import Switcher from "src/components/common/Switcher";
import ResultsItemRoute from "src/components/common/ResultsItem/ResultsItemRoute";

import { FavoriteType } from "src/services/storeAsync";
import { useAreas } from "src/hooks/useAreas";
import { useFavoriteContext } from "src/context/FavoritesContext";
import { getFavoriteColor } from "src/utils/getFavoriteColor";
import { SwitcherOption } from "src/components/common/Switcher";

const options: SwitcherOption<"done" | "project" | "other">[] = [
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

const RouteFavorites = () => {
  const [section, setSection] = useState<FavoriteType>("done");
  const { rocks } = useAreas();
  const { favoriteRoutes } = useFavoriteContext();

  return (
    <View style={styles.container}>
      <Switcher
        onPress={setSection}
        active={section}
        options={options}
        badgeColor={getFavoriteColor(section)}
      />
      {favoriteRoutes && favoriteRoutes[`${section}`].length > 0 && (
        <Animated.FlatList
          data={favoriteRoutes[`${section}`]}
          renderItem={({ item }) => (
            <ResultsItemRoute
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: "#fff",
    gap: 12,
  },
});

export default RouteFavorites;
