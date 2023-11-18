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
  StyleSheet,
} from "react-native";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";
import { useAtom } from "jotai";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import Accordion from "../common/Accordion";
import { Route, createRating, updateRating } from "../../services/rocks";
import { rockActiveRoute } from "../../store/rock";
import { getMeaningfulGrade } from "../../utils/getMeaningfulGrade";
import { styleGuide } from "../../styles/guide";
import { useMutation } from "@tanstack/react-query";
import { useUserProfile } from "../../hooks/useUserProfile";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

type RockInfoProps = {
  route: Route;
  index: number;
  realIndex?: number;
  rockRefetch: () => void;
};

const RouteInfo = ({ route, index, realIndex, rockRefetch }: RockInfoProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeRoute, setActiveRoute] = useAtom(rockActiveRoute);
  const [selectedRouteToRate, setSelectedRouteToRate] = useState<Route | null>(
    null,
  );
  const [rating, setRating] = useState(3);
  const { data: userData } = useUserProfile();

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (activeRoute === route.attributes.uuid) return setActiveRoute(null);
    setActiveRoute(route.attributes.uuid);
  };

  const { mutate: sendRouteRatingMutation, isLoading } = useMutation({
    mutationFn: () =>
      createRating(selectedRouteToRate!.id, rating, userData?.id),
    onSuccess: (data) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShowSuccess(true);
      rockRefetch();
      setTimeout(() => bottomSheetModalRef.current?.dismiss(), 2000);
    },
  });

  const { mutate: updateRouteRatingMutation } = useMutation({
    mutationFn: () => updateRating(route.attributes.usersRating.id, rating),
    onSuccess: (data) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShowSuccess(true);
      rockRefetch();
      setTimeout(() => bottomSheetModalRef.current?.dismiss(), 2000);
    },
  });

  const handleSendRateButton = () => {
    if (!route.attributes.usersRating) sendRouteRatingMutation();
    if (
      route.attributes.usersRating &&
      rating !== route.attributes.usersRating.score
    )
      updateRouteRatingMutation();
  };

  const handleRateRoute = (route: Route) => {
    setSelectedRouteToRate(route);
    if (route.attributes.usersRating) {
      setRating(route.attributes.usersRating.score);
    } else {
      setRating(4);
    }
    bottomSheetModalRef.current?.present();
  };

  const dismissBottomSheet = () => {
    setShowSuccess(false);
    setSelectedRouteToRate(null);
  };

  const snapPoints = useMemo(() => ["40%"], []);
  return (
    <>
      <AnimatedTouchableOpacity
        key={route.attributes.uuid}
        activeOpacity={0.9}
        onPress={handlePress}
      >
        <Accordion
          Title={
            <View style={styles.container}>
              <View style={styles.nameContainer}>
                <View style={styles.routeIndexContainer}>
                  <Text style={styles.routeIndex}>{realIndex! + 1}</Text>
                </View>
                <View>
                  <Text>{route.attributes.display_name}</Text>
                  <Text>{getMeaningfulGrade(route.attributes.grade)}</Text>
                </View>
              </View>
              <View>
                <Text>
                  {isNaN(route.attributes.averageScore)
                    ? "brak ocen"
                    : route.attributes.averageScore}
                </Text>
              </View>
            </View>
          }
          Content={
            route.attributes.uuid === activeRoute && (
              <View style={styles.detailsContainer}>
                <View>
                  <Text>Bardzo wazne dane o drdoddze</Text>
                  <Text>Bardzo wazne dane o drdoddze</Text>
                  <Text>Bardzo wazne dane o drdoddze</Text>
                </View>
                <TouchableOpacity onPress={() => handleRateRoute(route)}>
                  <Text>
                    {route.attributes.usersRating
                      ? `Twoja ocena: ${route.attributes.usersRating.score}`
                      : "Oceń drogę"}
                  </Text>
                </TouchableOpacity>
              </View>
            )
          }
        />
      </AnimatedTouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onDismiss={dismissBottomSheet}
        enableDismissOnClose
        style={styles.modalContainer}
      >
        {showSuccess ? (
          <Text>Sukces!</Text>
        ) : (
          <>
            <Text>Twoja ocena dla drogi</Text>
            <Text>{selectedRouteToRate?.attributes.display_name}</Text>
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((item) => (
                <TouchableOpacity onPress={() => setRating(item)}>
                  <View
                    style={item <= rating ? styles.starFilled : styles.star}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={handleSendRateButton}>
              <View style={styles.starsButton}>
                <Text>
                  {route.attributes.usersRating ? "Popraw ocenę" : "Oceń"}
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  routeIndexContainer: {
    flexBasis: 30,
  },
  routeIndex: {
    ...styleGuide.text.heading["2"],
  },
  icon: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 50,
  },
  gradeContainer: {
    flexBasis: 44,
    borderRightWidth: 1,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {},
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  starContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 4,
  },
  star: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
  },
  starFilled: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: "yellow",
  },
  starsButton: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RouteInfo;
