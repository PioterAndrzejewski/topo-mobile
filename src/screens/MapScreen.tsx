import { SafeAreaView } from "react-native-safe-area-context";
import FiltersButton from "src/components/common/FiltersButton";

import ScreenTitle from "src/components/common/ScreenTitle";
import Map from "src/components/home/Map";
import ResultsList from "src/components/home/ResultsList";

import { palette } from "src/styles/theme";

export default function MapScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: palette.white, position: "relative" }}
    >
      <ScreenTitle title='Mapa' centered />
      <FiltersButton />
      <Map />
      <ResultsList />
    </SafeAreaView>
  );
}
