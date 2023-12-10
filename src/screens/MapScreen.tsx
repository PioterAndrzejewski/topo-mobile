import { View } from "react-native";

import ResultsList from "src/components/home/ResultsList";
import Map from "src/components/home/Map";

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Map />
      <ResultsList />
    </View>
  );
}
