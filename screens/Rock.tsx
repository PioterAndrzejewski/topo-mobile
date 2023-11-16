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
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAtom } from "jotai";

import AppLoading from "../components/common/AppLoading";
import RockDrawing from "../components/rock/drawing/RockDrawing";
import Buttons from "../components/rock/drawing/Buttons";
import RouteInfo from "../components/rock/RouteInfo";
import Header from "../components/rock/Header";
import ModelView from "../components/rock/ModelView";

import { useRock } from "../hooks/useRock";
import { HomeScreenNavigationProp } from "../types/type";
import { rockActiveRoute } from "../store/rock";
import { styleGuide } from "../styles/guide";
import RockDetails from "../components/rock/RockDetails";
import { Route } from "../services/rocks";

type Props = NativeStackScreenProps<HomeScreenNavigationProp, "Rock">;

const Rock = ({ route }: Props) => {
  const [topoMode, setTopoMode] = useState<0 | 1>(0);
  const [activeRoute, setActiveRoute] = useAtom(rockActiveRoute);
  const { data, refetch } = useRock(route.params.id);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

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

  const snapPoints = useMemo(() => ["15%", "30", "50%", "80%"], []);

  return (
    <View style={styles.container}>
      <Header
        onChange={setTopoMode}
        name={data?.attributes?.Name}
        mode={topoMode}
      />
      {data && topoMode === 0 && (
        <RockDrawing
          imageUrl={data?.attributes?.image?.data.attributes.url}
          routes={data?.attributes?.routes.data}
          activeId={activeRoute}
        />
      )}
      {data && topoMode === 1 && <ModelView id={route.params.id} />}
      {topoMode === 0 && <Buttons handleRouteChange={handleRouteChange} />}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        containerStyle={styles.bottomSheetContainer}
        style={styleGuide.bottomSheet}
      >
        <BottomSheetScrollView style={styles.routesContainer} scrollEnabled>
          {data?.attributes ? (
            <>
              <RockDetails id={data?.attributes.uuid} />
              {data?.attributes?.routes.data.map((route, index) => (
                <RouteInfo
                  route={route}
                  index={index}
                  realIndex={data?.attributes?.routes.data.findIndex(
                    (dataRoute: Route) =>
                      route.attributes.uuid === dataRoute.attributes.uuid,
                  )}
                  rockRefetch={refetch}
                />
              ))}
            </>
          ) : (
            <AppLoading />
          )}
        </BottomSheetScrollView>
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
