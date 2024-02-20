import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Animated, { BounceInUp } from "react-native-reanimated";

import Text from "../ui/Text";
import View from "../ui/View";

import { TouchableOpacity } from "react-native";
import { RockData } from "src/services/rocks";
import { getLastSeenRock } from "src/services/storeAsync";
import { mapAtom, selectedRockAtom } from "src/store/results";
import { HomeScreenNavigationProp } from "src/types/type";
import { getRegionForZoom } from "src/utils/getRegionForZoom";
import { getZoomFromStage } from "src/utils/getZoomFromStage";

const LastViewed = () => {
  const [lastViewed, setLastViewed] = useState<RockData | null>(null);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const setSelectedRock = useSetAtom(selectedRockAtom);
  const map = useAtomValue(mapAtom);

  useEffect(() => {
    const checkLastViewed = async () => {
      const lastSeen = await getLastSeenRock();
      if (!!lastSeen) setLastViewed(lastSeen);
    };
    setTimeout(checkLastViewed, 1500);
  }, []);

  const animateTo = () => {
    if (!lastViewed) return;
    navigation.navigate("Map");
    const newRegion = getRegionForZoom(
      lastViewed.attributes.coordinates.latitude,
      lastViewed.attributes.coordinates.longitude,
      getZoomFromStage(3),
    );
    setLastViewed(null);
    setTimeout(() => {
      if (map && map.current) {
        map.current.animateToRegion(newRegion);
      }
      setSelectedRock(lastViewed.attributes.uuid);
    }, 100);
  };

  if (!lastViewed) return;
  return (
    <Swipeable
      renderLeftActions={() => <View width='100%' height={200} />}
      containerStyle={{
        position: "absolute",
        top: 20,
        left: 0,
        width: "100%",
      }}
      onSwipeableOpen={() => setLastViewed(null)}
    >
      <Animated.View entering={BounceInUp}>
        <View justifyContent='center' width='100%' alignItems='center'>
          <BlurView
            intensity={15}
            blurReductionFactor={1}
            style={{ borderRadius: 24, overflow: "hidden" }}
          >
            <TouchableOpacity onPress={animateTo}>
              <View
                paddingHorizontal='3xl'
                paddingVertical='m'
                borderRadius={12}
                backgroundColor='backgroundTertiaryFaded'
                justifyContent='center'
                alignItems='center'
                gap='s'
              >
                <Text variant='body'>Ostatnio oglądane:</Text>

                <Text variant='h4' color='textSecondary'>
                  {lastViewed.attributes.Name}
                </Text>
              </View>
            </TouchableOpacity>
          </BlurView>
        </View>
      </Animated.View>
    </Swipeable>
  );
};

export default LastViewed;
