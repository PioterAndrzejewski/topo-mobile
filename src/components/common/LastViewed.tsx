import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Animated, {
  BounceInUp,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import Text from "../ui/Text";
import View from "../ui/View";

import { RockData } from "src/services/rocks";
import { getLastSeenRock } from "src/services/storeAsync";
import { mapAtom, selectedRockAtom } from "src/store/results";
import { HomeScreenNavigationProp } from "src/types/type";
import { getRegionForZoom } from "src/utils/getRegionForZoom";
import { getZoomFromStage } from "src/utils/getZoomFromStage";
import { HandIcon } from "../icons/Hand";

const LastViewed = () => {
  const [lastViewed, setLastViewed] = useState<RockData | null>(null);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const setSelectedRock = useSetAtom(selectedRockAtom);
  const map = useAtomValue(mapAtom);
  const positionX = useSharedValue(0);
  const rotation = useSharedValue(-10);

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

  React.useEffect(() => {
    positionX.value = withRepeat(
      withSequence(
        withTiming(30, { duration: 400, easing: Easing.cubic }),
        withDelay(0, withTiming(0, { duration: 400, easing: Easing.linear })),
      ),
      -1, // -1 means infinite loop
    );

    rotation.value = withRepeat(
      withSequence(
        withTiming(30, { duration: 400, easing: Easing.linear }),
        withDelay(0, withTiming(0, { duration: 400, easing: Easing.linear })),
      ),
      -1,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

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
                <View position='absolute' right={30}>
                  <Animated.View style={animatedStyle}>
                    <HandIcon size={32} />
                  </Animated.View>
                </View>
              </View>
            </TouchableOpacity>
          </BlurView>
        </View>
      </Animated.View>
    </Swipeable>
  );
};

export default LastViewed;
