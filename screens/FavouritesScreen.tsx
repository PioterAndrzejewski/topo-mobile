import { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import Switcher from "../components/common/Switcher";
import ResultsItemRoute from "../components/common/ResultsItem/ResultsItemRoute";

import { FavoriteType } from "../services/storeAsync";
import { useAreas } from "../hooks/useAreas";
import { useFavoriteContext } from "../context/FavoritesContext";

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
  const { rocks } = useAreas();
  const { favoriteRoutes } = useFavoriteContext();

  return (
    <View style={styles.container}>
      <Switcher onPress={setSection} active={section} options={options} />
      {favoriteRoutes && favoriteRoutes[`${section}`].length > 0 && (
        <Animated.FlatList
          data={favoriteRoutes[`${section}`]}
          renderItem={({ item }) => {
            console.log(item);
            // return (
            //   <ResultsItemRoute
            //     name={item.attributes.display_name}
            //     item={item}
            //     itemStage={3}
            //     isRock
            //     id={item.attributes.uuid}
            //     key={item.attributes.uuid}
            //   />
            // );
            return (
              <ResultsItemRoute
                name={item.attributes.display_name}
                item={item}
                itemStage={3}
                isRock
                id={item.attributes.uuid}
                key={item.attributes.uuid}
              />
            );
          }}
        />
      )}
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
