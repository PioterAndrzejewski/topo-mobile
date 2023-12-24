import { useState } from "react";
import Animated from "react-native-reanimated";

import ResultsItemRoute from "src/components/common/ResultsItem/ResultsItemRoute";
import Switcher from "src/components/common/Switcher";
import View from "../ui/View";

import { SwitcherOption } from "src/components/common/Switcher";
import { useFavoriteContext } from "src/context/FavoritesContext";
import { FavoriteType } from "src/services/storeAsync";
import { getFavoriteColor } from "src/utils/getFavoriteColor";

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
  const { favoriteRoutes } = useFavoriteContext();

  return (
    <View flex={1} paddingTop='m' gap='m'>
      <View paddingHorizontal='m'>
        <Switcher
          onPress={setSection}
          active={section}
          options={options}
          badgeColor={getFavoriteColor(section)}
        />
      </View>
      {favoriteRoutes && favoriteRoutes[`${section}`].length > 0 && (
        <Animated.FlatList
          data={favoriteRoutes[`${section}`]}
          renderItem={({ item, index }) => (
            <View
              paddingHorizontal='m'
              paddingTop={index === 0 ? "m" : undefined}
            >
              <ResultsItemRoute
                name={item.attributes.display_name}
                item={item}
                isRock
                id={item.attributes.uuid}
                key={item.attributes.uuid}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default RouteFavorites;
