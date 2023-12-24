import { useTheme } from "@shopify/restyle";
import { useMemo, useState } from "react";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";

import ScreenTitle from "src/components/common/ScreenTitle";
import Switcher from "src/components/common/Switcher";
import RockFavorites from "src/components/favorites/RockFavorites";
import RouteFavorites from "src/components/favorites/RouteFavorites";
import View from "src/components/ui/View";

import { SwitcherOption } from "src/components/common/Switcher";
import { Theme } from "src/styles/theme";

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
  const { colors } = useTheme<Theme>();

  const renderFavorites = useMemo(() => {
    switch (mode) {
      case "routes":
        return <RouteFavorites />;
      case "rocks":
        return <RockFavorites />;
    }
  }, [mode]);

  return (
    <Animated.View
      style={{ flex: 1, backgroundColor: colors.backgroundScreen }}
      entering={SlideInRight}
      exiting={SlideInLeft}
    >
      <ScreenTitle title='Zapisane' centered />
      <View flex={1}>
        <View paddingHorizontal='m'>
          <Switcher onPress={setMode} active={mode} options={options} />
        </View>
        {renderFavorites}
      </View>
    </Animated.View>
  );
}
