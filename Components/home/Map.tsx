import React, { useEffect, useRef, useState } from "react";
import { Platform, Text, Dimensions } from "react-native";
import {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Region,
} from "react-native-maps";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-map-clustering";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";

import {
  regionAtom,
  mapAtom,
  zoomAtom,
  listToRenderAtom,
  resultsStageAtom,
  startRegion,
} from "../../store/results";
import { useAreas } from "../../hooks/useAreas";
import { getStageFromZoom } from "../../utils/getZoomFromStage";
import useDebounce from "../../hooks/useDebounce";



export default function Map() {
  const [region, setRegion] = useState<Region>(startRegion);
  const setGlobalRegionState = useSetAtom(regionAtom);
  useDebounce(() => setGlobalRegionState(region), 1000, [region]);

  const listToRender = useAtomValue(listToRenderAtom);
  const mapRef = useRef(null);
  const setMap = useSetAtom(mapAtom);

  useEffect(() => {
    setMap(mapRef);
  }, [mapRef]);

  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        showsMyLocationButton
        showsCompass
        maxZoomLevel={18}
        showsUserLocation
        showsBuildings={false}
        provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {listToRender &&
          listToRender.length > 0 &&
          listToRender.map((item) => {
            return (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: item.attributes.coordinates.latitude,
                  longitude: item.attributes.coordinates.longitude,
                }}
              >
                <Animated.View
                  style={styles.markerContainer}
                >
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
    height: "90%",
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
