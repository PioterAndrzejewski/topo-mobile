import Animated from "react-native-reanimated";

import RockResultsItem from "src/components/common/ResultsItem/RockResultsItem";
import View from "../ui/View";

import { useFavoriteContext } from "src/context/FavoritesContext";

const RouteFavorites = () => {
  const { favoriteRocks } = useFavoriteContext();

  return (
    <View flex={1} paddingTop='m' gap='s'>
      {favoriteRocks && favoriteRocks.length > 0 && (
        <Animated.FlatList
          data={favoriteRocks}
          keyExtractor={(item) => item.attributes.Name}
          renderItem={({ item }) => {
            return (
              <View paddingHorizontal='m'>
                <RockResultsItem
                  name={item.attributes.Name}
                  item={item}
                  id={item.attributes.uuid}
                  key={item.attributes.uuid}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default RouteFavorites;
