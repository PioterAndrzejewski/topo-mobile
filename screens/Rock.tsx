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
import RockDrawing from "../Components/rock/drawing/RockDrawing";
import ChangeRouteButton from "../Components/rock/drawing/ChangeRouteButton";
import RouteInfo from "../Components/rock/RouteInfo";

import { useRock } from "../hooks/useRock";
import { HomeScreenNavigationProp } from "../types/type";
import { rockActiveRoute } from "../store/rock";
import { ChevronLeftIcon } from "../Components/icons/ChevronLeft";
import { ChevronRightIcon } from "../Components/icons/ChevronRight";
import { styleGuide } from "../styles/guide";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

type Props = NativeStackScreenProps<HomeScreenNavigationProp, "Rock">;

const Rock = ({ route }: Props) => {
  const [activeRoute, setActiveRoute] = useAtom(rockActiveRoute);
  const { data } = useRock(route.params.id);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleRouteChange = (step: number) => {
    if (!data) return;
    if (activeRoute === null)
      return setActiveRoute(data.attributes.routes.data[0].attributes.uuid);
    const currentIndex = data?.attributes.routes.data.findIndex(
      (route) => route.attributes.uuid === activeRoute,
    );
    const newIndex = currentIndex > -1 ? currentIndex + step : 0;
    const routesNumber = data.attributes.routes.data.length;
    if (newIndex === routesNumber)
      return setActiveRoute(data.attributes.routes.data[0].attributes.uuid);
    if (newIndex === -1)
      return setActiveRoute(
        data.attributes.routes.data[routesNumber - 1].attributes.uuid,
      );
    setActiveRoute(data.attributes.routes.data[newIndex].attributes.uuid);
  };

  const routeList = useMemo(() => {
    const copiedArray = data?.attributes?.routes.data.map((el) => el);
    return copiedArray?.sort((route) =>
      route.attributes.uuid === activeRoute ? -1 : 1,
    );
  }, [activeRoute, data]);

  const snapPoints = useMemo(() => ["22%", "50%", "90%"], []);

  return (
    <View style={styles.container}>
      {data && (
        <RockDrawing
          imageUrl={data?.attributes?.image?.data.attributes.url}
          routes={data?.attributes?.routes.data}
          activeId={activeRoute}
        />
      )}
      <TouchableOpacity
        style={styles.buttonContainerLeft}
        activeOpacity={0.5}
        onPress={() => handleRouteChange(-1)}
      >
        <ChangeRouteButton
          Icon={<ChevronLeftIcon size={36} />}
          style={styles.buttonLeft}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainerRight}
        activeOpacity={0.5}
        onPress={() => handleRouteChange(1)}
      >
        <ChangeRouteButton
          Icon={<ChevronRightIcon size={36} />}
          style={styles.buttonRight}
        />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        containerStyle={styles.bottomSheetContainer}
        style={styleGuide.bottomSheet}
      >
        <ScrollView style={styles.routesContainer}>
          {routeList ? (
            routeList.map((route, index) => (
              <RouteInfo
                route={route}
                index={index}
                realIndex={data?.attributes?.routes.data.findIndex(
                  (dataRoute) =>
                    route.attributes.uuid === dataRoute.attributes.uuid,
                )}
              />
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
  buttonContainerLeft: {
    zIndex: 3,
    position: "absolute",
  },
  buttonLeft: {
    padding: 5,
    position: "absolute",
    top: 250,
    left: 10,
    backgroundColor: "#fff",
    opacity: 0.5,
    borderRadius: 30,
  },
  buttonContainerRight: {
    zIndex: 3,
    position: "absolute",
    right: 60,
  },
  buttonRight: {
    padding: 5,
    position: "absolute",
    top: 250,
    backgroundColor: "#fff",
    opacity: 0.5,
    borderRadius: 30,
  },
  bottomSheetContainer: {
    zIndex: 4,
    shadowOffset: { width: 0, height: -20 },
    shadowRadius: 0,
    shadowColor: "#000",
    shadowOpacity: 0,
  },
  routesContainer: {
    display: "flex",
    paddingHorizontal: 16,
    paddingTop: 24,
    flexDirection: "column",
    rowGap: 10,
  },
});


