import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Animated, { BounceInUp } from "react-native-reanimated";
import { TouchableOpacity } from 'react-native-gesture-handler';

import Text from "../ui/Text";
import View from "../ui/View";

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
            intensity={25}
            blurReductionFactor={1}
            style={{ borderRadius: 24, overflow: "hidden" }}
          >
            <TouchableOpacity onPress={animateTo}>
              <View
                paddingVertical='m'
                width={320}
                borderRadius={12}
                backgroundColor='backgroundLight'
                justifyContent='center'
                alignItems='center'
                gap='xs'
                opacity={0.6}
              >
                <Text variant='h4'>Przejdź do ostatnio oglądanej:</Text>

                <Text variant='h3'>{lastViewed.attributes.Name}</Text>
              </View>
            </TouchableOpacity>
          </BlurView>
        </View>
      </Animated.View>
    </Swipeable>
  );
};

export default LastViewed;
