import React, {
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  LayoutAnimation,
  TouchableOpacity,
  Easing,
} from "react-native";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";
import { useAtom } from "jotai";

import Accordion from "../common/Accordion";
import { Route } from "../../services/rocks";
import { rockActiveRoute } from "../../store/rock";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

type RockInfoProps = {
  route: Route;
  index: number;
};

const RouteInfo = ({ route, index }: RockInfoProps) => {
  const [activeRoute, setActiveRoute] = useAtom(rockActiveRoute);
  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveRoute(route.attributes.uuid);
  };
  return (
    <AnimatedTouchableOpacity
      key={route.attributes.uuid}
      activeOpacity={0.9}
      onPress={handlePress}
    >
      <Accordion
        Title={<Text>{route.attributes.display_name}</Text>}
        Content={
          route.attributes.uuid === activeRoute && (
            <View>
              <Text>Bardzo wazne dane o drdoddze</Text>
            </View>
          )
        }
      />
    </AnimatedTouchableOpacity>
  );
};

export default RouteInfo;
