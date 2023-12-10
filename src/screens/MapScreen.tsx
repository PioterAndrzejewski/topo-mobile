import { View } from "react-native";

import Map from "src/components/home/Map";
import ResultsList from "src/components/home/ResultsList";

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Map />
      <ResultsList />
    </View>
  );
}
