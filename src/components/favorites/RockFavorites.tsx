import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import RockResultsItem from "src/components/common/ResultsItem/RockResultsItem";

import { useFavoriteContext } from "src/context/FavoritesContext";

const RouteFavorites = () => {
  const { favoriteRocks } = useFavoriteContext();

  return (
    <View style={styles.container}>
      {favoriteRocks && favoriteRocks.length > 0 && (
        <Animated.FlatList
          data={favoriteRocks}
          keyExtractor={(item) => item.attributes.Name}
          renderItem={({ item }) => {
            return (
              <RockResultsItem
                name={item.attributes.Name}
                item={item}
                id={item.attributes.uuid}
                key={item.attributes.uuid}
              />
            );
          }}
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
