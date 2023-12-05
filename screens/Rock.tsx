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
  const [activeRoute, setActiveRoute] = useAtom(rockActiveRoute);
  const [activeImage, setActiveImage] = useState(0);
  const { data, refetch } = useRock(route.params.id);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleImageChange = (step: number) => {
    if (!data) return;
    let newIndex = activeImage + step;
    if (newIndex < 0) newIndex = data.attributes.image.data.length - 1;
    if (newIndex === data.attributes.image.data.length) newIndex = 0;
    setActiveImage(newIndex);
  };

  const snapPoints = useMemo(() => ["15%", "30", "50%", "80%"], []);

  return (
    <View style={styles.container}>
      <Header
        name={data?.attributes?.Name}
        numberOfImages={data?.attributes?.image.data.length}
        onCirclePress={setActiveImage}
        activeImage={activeImage}
      />
      {data && data.attributes && (
        <RockDrawing
          imageUrl={data.attributes.image?.data[activeImage].attributes.url}
          routes={data.attributes.routes.data}
          activeId={activeRoute}
          activeImage={activeImage}
        />
      )}
      <Buttons handleRouteChange={handleImageChange} />
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
                  key={route.attributes.uuid}
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
