import { useTheme } from "@shopify/restyle";
import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import ScreenTitle from "src/components/common/ScreenTitle";
import Switcher from "src/components/common/Switcher";
import RockFavorites from "src/components/favorites/RockFavorites";
import RouteFavorites from "src/components/favorites/RouteFavorites";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { SwitcherOption } from "src/components/common/Switcher";
import { Theme, palette } from "src/styles/theme";

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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: palette.white }}
      edges={["top"]}
    >
      <ScreenTitle title='Zapisane' centered />
      <View flex={1}>
        <View
          paddingHorizontal='m'
          borderBottomWidth={1}
          paddingBottom='m'
          borderBottomColor='backgroundSecondary'
        >
          <Switcher onPress={setMode} active={mode} options={options} />
        </View>
        {renderFavorites}
        <View paddingHorizontal='m'>
          <Text variant='caption'>
            Ulubione zapisujesz na Twoim urządzeniu i nie będą dostępne jak
            usuniesz aplikację, dane aplikacji i na innych urządzeniach.
            Pracujemy nad tym :)
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
