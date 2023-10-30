import React, {
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  Text,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import BottomSheet from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAtom } from "jotai";

import AppLoading from "../Components/common/AppLoading";
import RockDrawing from "../Components/rock/RockDrawing";
import Accordion from "../Components/common/Accordion";

import { useRock } from "../hooks/useRock";
import { styleGuide } from "../styles/guide";
import { HomeScreenNavigationProp } from "../types/type";
import { rockActiveRoute } from "../store/rock";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

type Props = NativeStackScreenProps<HomeScreenNavigationProp, "Rock">;

const Rock = ({ route }: Props) => {
  const [activeRoute, setActiveRoute] = useAtom(rockActiveRoute);
  const { data } = useRock(route.params.id);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onRoutePress = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (activeRoute === id) return setActiveRoute(null);
    setActiveRoute(id);
  };

  const snapPoints = useMemo(() => ["10%", "50%", "90%"], []);

  return (
    <View style={styles.container}>
      {data && (
        <RockDrawing
          imageUrl={data?.attributes?.image?.data.attributes.url}
          routes={data?.attributes?.routes.data}
          activeId={activeRoute}
        />
      )}

      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <ScrollView>
          {data ? (
            data?.attributes?.routes.data.map((route, index) => (
              <AnimatedTouchableOpacity
                key={route.attributes.uuid}
                activeOpacity={0.9}
                entering={FadeInRight.delay(50 * index)}
                exiting={FadeOutLeft}
                onPress={() => onRoutePress(route.attributes.uuid)}
              >
                <Accordion
                  Title={<Text>{route.attributes.display_name}</Text>}
                  Content={
                    route.attributes.uuid === activeRoute && (
                      <Text>Bardzo wazne dane o drdoddze</Text>
                    )
                  }
                />
              </AnimatedTouchableOpacity>
            ))
          ) : (
            <AppLoading />
          )}
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

export default Rock;

const styles = StyleSheet.create({
  container: {
    backgroundColor: styleGuide.color.white,
    paddingTop: 40,
    flex: 1,
  },
});
