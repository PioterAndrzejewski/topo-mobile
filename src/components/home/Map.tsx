import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import { Platform, ViewStyle } from "react-native";
import MapView from "react-native-map-clustering";
import {
  Marker,
  default as NativeMap,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import LastViewed from "../common/toast/LastViewed";
import Text from "../ui/Text";
import View from "../ui/View";

import { useQueryClient } from "@tanstack/react-query";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFilters } from "src/context/FilteredRocksContext";
import { useAreas } from "src/hooks/useAreas";
import { useDebounce } from "src/hooks/useDebounce";
import { useLogout } from "src/hooks/useLogout";
import { useUserProfile } from "src/hooks/useUserProfile";
import { useUserSubscription } from "src/hooks/useUserSubscription";
import { useUserProducts } from "src/services/payments";
import { RockData } from "src/services/rocks";
import { wantsToUseNotLoggedAtom } from "src/store/global";
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
import { ErrorIcon } from "../icons/Error";
import { GiftIcon } from "../icons/Gift";

export default function Map() {
  const [region, setRegion] = useState<Region>(startRegion);
  const setGlobalRegionState = useSetAtom(regionAtom);
  const setSelectedRock = useSetAtom(selectedRockAtom);
  useDebounce(() => setGlobalRegionState(region), 200, [region]);
  const { data: userProducts } = useUserProducts();
  const userHasSubscription = useUserSubscription();
  const wantsToUseNotLogged = useAtomValue(wantsToUseNotLoggedAtom);
  const logout = useLogout();
  const user = useUserProfile();

  const queryClient = useQueryClient();
  const { rocksIsEmpty, isLoading } = useAreas();
  const { filteredRocks } = useFilters();
  const mapRef = useRef<NativeMap>(null);
  const setMap = useSetAtom(mapAtom);

  useEffect(() => {
    setMap(mapRef);
  }, [mapRef]);

  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
  };

  // queryClient.invalidateQueries({
  //   queryKey: ["rocks"],
  // });
  // queryClient.invalidateQueries({
  //   queryKey: ["product"],
  // });
  // queryClient.invalidateQueries({
  //   queryKey: ["products"],
  // });

  const noDataToShow = useMemo(() => {
    if (!wantsToUseNotLogged) {
      return false;
    }
    if (rocksIsEmpty) {
      return true;
    }
    return false;
  }, [isLoading, wantsToUseNotLogged, filteredRocks]);

  return (
    <>
      {noDataToShow && (
        <View p='m'>
          <View
            backgroundColor='backgroundWarning'
            flexDirection='row'
            borderRadius={24}
          >
            <View alignItems='center' justifyContent='center' marginLeft='m'>
              <View
                padding='xs'
                borderRadius={40}
                borderWidth={1}
                borderColor='backgroundScreen'
              >
                <ErrorIcon />
              </View>
            </View>
            <View
              flexWrap='wrap'
              flex={1}
              justifyContent='center'
              alignItems='center'
              p='m'
              gap='m'
            >
              <Text>Na Twoim urządzeniu nie ma zapisanych danych.</Text>
              <TouchableOpacity onPress={logout}>
                <Text color='textSecondary' variant='h3'>
                  Zaloguj się by je pobrać
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <View flex={1}>
        <MapView
          ref={mapRef}
          showsCompass
          maxZoomLevel={18}
          showsUserLocation
          showsBuildings={false}
          provider={
            Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
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
          toolbarEnabled={false}
        >
          {filteredRocks &&
            filteredRocks.length > 0 &&
            filteredRocks.map((item: RockData) => {
              const rockHasProduct = !!item.attributes.product.data;
              const userHas = userProducts?.find(
                (product) =>
                  product.product.uuid ===
                  item.attributes.product.data?.attributes.uuid,
              );

              if (!user.data?.isModerator && item.attributes.forModerators) {
                return null;
              }

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
                    <Animated.View
                      style={$markerContainer}
                      entering={FadeIn}
                      exiting={FadeOut}
                    >
                      {!userHas && !userHasSubscription && rockHasProduct && (
                        <CartIcon size={20} />
                      )}
                      {!rockHasProduct && (
                        <GiftIcon size={20} color={palette.green} />
                      )}
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
    </>
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
