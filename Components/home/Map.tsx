import React, { useState } from "react";
import { Platform, Text } from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Region,
} from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useAtom } from "jotai";
import Animated from "react-native-reanimated";

import {
  resultsCurrentItemAtom,
  resultsStageAtom,
  listToRenderAtom,
} from "../../store/results";
import { useAreas } from "../../hooks/useAreas";
import { calculateDistance } from "../../utils/calculateDistance";

const getZoomFromRegion = (region: Region) => {
  return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
};

export default function Map() {
  const [region, setRegion] = useState<Region>({
    latitude: 50.36305,
    longitude: 19.83229,
    latitudeDelta: 1.5,
    longitudeDelta: 1.5,
  });
  const [zoom, setZoom] = useState<number>(18);
  const [resultsStage, setResultsStage] = useAtom(resultsStageAtom);
  const [currentItem, setCurrentItem] = useAtom(resultsCurrentItemAtom);
  const [listToRender, setListToRender] = useAtom(listToRenderAtom);
  const { areas, regions, sectors, rocks, isLoading } = useAreas();

  const onRegionChangeComplete = (newRegion: Region) => {
    setZoom(getZoomFromRegion(newRegion));
    setRegion(newRegion);
    setListToRender((list) => {
      const listCopy = list.map((el) => el);
      return listCopy.sort((a, b) => {
        const distA = calculateDistance(newRegion, a.attributes.coordinates);
        const distB = calculateDistance(newRegion, b.attributes.coordinates);
        return distA - distB;
      });
    });
    console.log(zoom);
    if (zoom < 8) setResultsStage(0);
    if (zoom >= 9) setResultsStage(1);
    if (zoom >= 10) setResultsStage(2);
    if (zoom >= 11) setResultsStage(3);
  };
  return (
    <View style={styles.container}>
      <MapView
        maxZoomLevel={18}
        showsUserLocation
        provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {listToRender?.length > 0 &&
          listToRender.map((item) => {
            return (
              <Marker
                coordinate={{
                  latitude: item.attributes.coordinates?.latitude || 0,
                  longitude: item.attributes.coordinates?.longitude || 0,
                }}
              >
                <Animated.View style={styles.markerContainer}>
                  <Text>{item.attributes.Name}</Text>
                </Animated.View>
              </Marker>
            );
          })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: "#dddddd78",
  },
});
