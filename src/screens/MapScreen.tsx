import ScreenTitle from "src/components/common/ScreenTitle";
import Map from "src/components/home/Map";
import ResultsList from "src/components/home/ResultsList";
import View from "src/components/ui/View";

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenTitle centered title='Mapa' />
      <Map />
      <ResultsList />
    </View>
  );
}
