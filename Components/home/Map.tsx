import React, { useEffect, useRef } from "react";
import { Platform, Text, Dimensions } from "react-native";
import {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Region,
} from "react-native-maps";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-map-clustering";
import { useAtom, useSetAtom } from "jotai";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";

import { regionAtom, mapAtom, zoomAtom } from "../../store/results";
import { useAreas } from "../../hooks/useAreas";
import { getGeoJson } from "../../utils/getGeoJson";

const getZoomFromRegion = (region: Region) => {
  return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
};

const getBoundingBox = (region: Region): [number, number, number, number] => [
  region.longitude - region.longitudeDelta, // westLng - min lng
  region.latitude - region.latitudeDelta, // southLat - min lat
  region.longitude + region.longitudeDelta, // eastLng - max lng
  region.latitude + region.latitudeDelta, // northLat - max lat
];

export default function Map() {
  const [region, setRegion] = useAtom(regionAtom);
  const [zoom, setZoom] = useAtom(zoomAtom);
  const { width, height } = Dimensions.get("window");
  const { rocks } = useAreas();

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
        {rocks &&
          rocks.length > 0 &&
          rocks.map((item) => {
            console.log(item);
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
                  entering={BounceIn}
                  exiting={BounceOut}
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
