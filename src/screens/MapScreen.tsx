import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import ScreenTitle from "src/components/common/ScreenTitle";

import Map from "src/components/home/Map";
import ResultsList from "src/components/home/ResultsList";

export default function MapScreen() {
  return (
    <Animated.View
      style={{ flex: 1 }}
      entering={SlideInRight}
      exiting={SlideInLeft}
    >
      <ScreenTitle centered title='Mapa' />
      <Map />
      <ResultsList />
    </Animated.View>
  );
}
