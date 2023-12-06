import { View, TouchableOpacity, Text } from "react-native";
import Animated from "react-native-reanimated";

import { FavoriteType } from "../../services/storeAsync";
import { Route } from "../../services/rocks";

type FavoritesSectionProps = {
  type: FavoriteType;
  routes: Route[];
};

const FavoritesSection = () => {
  return (
    <View style={styles.resultsContainer}>
      <TouchableOpacity onPress={() => handleExpansion("routes")}>
        <View style={styles.titleContainer}>
          <Text>Drogi - {foundRoutes.length}</Text>
        </View>
      </TouchableOpacity>
      {foundRoutes.length < 1 && <Text>Brak dróg dla szukanej frazy</Text>}
      {foundRoutes.length > 0 && routesExpanded && (
        <Animated.FlatList
          scrollEnabled={false}
          data={foundRoutes.slice(0, 8)}
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

export default FavoritesSection;
