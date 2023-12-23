import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";

import Map from "src/components/home/Map";
import ResultsList from "src/components/home/ResultsList";

export default function MapScreen() {
  return (
    <Animated.View
      style={{ flex: 1 }}
      entering={SlideInRight}
      exiting={SlideInLeft}
    >
      <Map />
      <ResultsList />
    </Animated.View>
  );
}
