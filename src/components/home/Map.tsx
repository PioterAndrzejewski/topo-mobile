import { useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { ViewStyle } from "react-native";
import MapView from "react-native-map-clustering";
import {
  Marker,
  default as NativeMap,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import LastViewed from "../common/LastViewed";
import Text from "../ui/Text";
import View from "../ui/View";

import { useAreas } from "src/hooks/useAreas";
import { useDebounce } from "src/hooks/useDebounce";
import { useUserSubscription } from "src/hooks/useUserSubscription";
import { useUserProducts } from "src/services/payments";
import { RockData } from "src/services/rocks";
import {
  mapAtom,
  regionAtom,
  selectedRockAtom,
  startRegion,
} from "src/store/results";
import { palette, styleGuide } from "src/styles/theme";
import { getRegionForZoom } from "src/utils/getRegionForZoom";
import { getZoomFromStage } from "src/utils/getZoomFromStage";
import { CartIcon } from "../icons/Cart";

export default function Map() {
  const [region, setRegion] = useState<Region>(startRegion);
  const setGlobalRegionState = useSetAtom(regionAtom);
  const setSelectedRock = useSetAtom(selectedRockAtom);
  useDebounce(() => setGlobalRegionState(region), 200, [region]);
  const { data: userProducts } = useUserProducts();
  const userHasSubscription = useUserSubscription();

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
        showsCompass
        maxZoomLevel={18}
        showsUserLocation
        showsBuildings={false}
        provider={PROVIDER_GOOGLE}
        style={$mapStyle}
        region={startRegion}
        onRegionChangeComplete={onRegionChangeComplete}
        userInterfaceStyle='light'
        rotateEnabled={false}
        pitchEnabled={false}
        loadingEnabled={true}
        clusterColor={palette.gray700}
        clusterFontFamily='Outfit500'
        clusterTextColor={palette.black}
        layoutAnimationConf={undefined}
      >
        {rocks &&
          rocks.length > 0 &&
          rocks.map((item: RockData) => {
            const userHas = userProducts?.find(
              (product) =>
                product.product.uuid ===
                item.attributes.product.data?.attributes.uuid,
            );

            const handleClick = () => {
              setSelectedRock(item.attributes.uuid);
              const newRegion = getRegionForZoom(
                item.attributes.coordinates.latitude,
                item.attributes.coordinates.longitude,
                getZoomFromStage(3),
              );
              if (mapRef && mapRef.current) {
                mapRef.current.animateToRegion(newRegion);
              }
            };
            return (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: item.attributes.coordinates.latitude,
                  longitude: item.attributes.coordinates.longitude,
                }}
                onPress={handleClick}
              >
                <View padding='xs'>
                  <Animated.View style={$markerContainer} entering={FadeIn} exiting={FadeOut}>
                    {!userHas && !userHasSubscription && <CartIcon size={20} />}
                    <Text
                      variant='marker'
                      additionalStyles={{ textAlign: "center" }}
                    >
                      {item.attributes.Name}
                    </Text>
                  </Animated.View>
                </View>
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
  height: "88%",
};

const $markerContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 8,
  paddingHorizontal: 24,
  margin: 12,
  gap: 12,
  maxWidth: 140,
  ...styleGuide.cardShadow,
  backgroundColor: palette.gray700,
  borderRadius: 12,
};
