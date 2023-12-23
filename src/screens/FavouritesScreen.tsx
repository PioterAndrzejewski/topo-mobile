import { useMemo, useState } from "react";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";

import Switcher from "src/components/common/Switcher";
import RockFavorites from "src/components/favorites/RockFavorites";
import RouteFavorites from "src/components/favorites/RouteFavorites";

import { SwitcherOption } from "src/components/common/Switcher";

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
        return <RockFavorites />;
    }
  }, [mode]);

  return (
    <Animated.View
      style={{ flex: 1 }}
      entering={SlideInRight}
      exiting={SlideInLeft}
    >
      <Switcher onPress={setMode} active={mode} options={options} />
      {renderFavorites}
    </Animated.View>
  );
}
