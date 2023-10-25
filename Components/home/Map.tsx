import React, { useState } from "react";
import { Platform } from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function Map() {
  const [mapRegion, setmapRegion] = useState({
    latitude: 50.56305,
    longitude: 19.53229,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });
  return (
    <View style={styles.container}>
      <MapView
        maxZoomLevel={18}
        showsUserLocation
        provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        style={styles.map}
        region={mapRegion}
      ></MapView>
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
});
