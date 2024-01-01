import { useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { Platform, ViewStyle } from "react-native";
import MapView from "react-native-map-clustering";
import {
  Marker,
  default as NativeMap,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import Animated, { FadeIn } from "react-native-reanimated";

import LastViewed from "../common/LastViewed";
import Text from "../ui/Text";
import View from "../ui/View";

import { useAreas } from "src/hooks/useAreas";
import { useDebounce } from "src/hooks/useDebounce";
import { RockData } from "src/services/rocks";
import {
  mapAtom,
  regionAtom,
  selectedRockAtom,
  startRegion,
} from "src/store/results";
import { palette } from "src/styles/theme";
import { getRegionForZoom } from "src/utils/getRegionForZoom";
import { getZoomFromStage } from "src/utils/getZoomFromStage";
import { LogoIcon } from "../icons/Logo";

export default function Map() {
  const [region, setRegion] = useState<Region>(startRegion);
  const setGlobalRegionState = useSetAtom(regionAtom);
  const setSelectedRock = useSetAtom(selectedRockAtom);
  useDebounce(() => setGlobalRegionState(region), 200, [region]);

  const { rocks } = useAreas();
  const mapRef = useRef<NativeMap>(null);
  const setMap = useSetAtom(mapAtom);

  useEffect(() => {
    setMap(mapRef);
  }, [mapRef]);

  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
  };

  return (
    <View flex={1}>
      <MapView
        ref={mapRef}
        showsMyLocationButton
        showsCompass
        maxZoomLevel={18}
        showsUserLocation
        showsBuildings={false}
        provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        style={$mapStyle}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {rocks &&
          rocks.length > 0 &&
          rocks.map((item: RockData) => {
            return (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: item.attributes.coordinates.latitude,
                  longitude: item.attributes.coordinates.longitude,
                }}
                onPress={() => {
                  setSelectedRock(item.attributes.uuid);
                  const newRegion = getRegionForZoom(
                    item.attributes.coordinates.latitude,
                    item.attributes.coordinates.longitude,
                    getZoomFromStage(3),
                  );
                  if (mapRef && mapRef.current) {
                    mapRef.current.animateToRegion(newRegion);
                  }
                }}
              >
                <Animated.View style={$markerContainer} entering={FadeIn}>
                  <LogoIcon size={48} />
                  <Text
                    variant='marker'
                    additionalStyles={{ textAlign: "center" }}
                  >
                    {item.attributes.Name}
                  </Text>
                </Animated.View>
              </Marker>
            );
          })}
      </MapView>
      <LastViewed />
    </View>
  );
}

const $mapStyle: ViewStyle = {
  width: "100%",
  height: "100%",
};

const $markerContainer: ViewStyle = {
  flex: 1,
  width: 120,
  justifyContent: "center",
  alignItems: "center",
  padding: 4,
  borderRadius: 12,
  backgroundColor: palette.white75,
};
