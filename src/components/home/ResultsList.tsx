import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Union } from "ts-toolbelt";

import Backdrop from "src/components/common/Backdrop";
import RockResultsItem from "src/components/common/ResultsItem/RockResultsItem";
import RockInfoExpanded from "src/components/home/rock/RockInfoExpanded";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useAreas } from "src/hooks/useAreas";
import { AreaData, RegionData, RockData } from "src/services/rocks";
import {
  AreasList,
  bottomSheetRefAtom,
  mapAtom,
  regionAtom,
  selectedRockAtom,
} from "src/store/results";
import { styleGuide } from "src/styles/theme";
import { getRegionForZoom } from "src/utils/getRegionForZoom";
import { getZoomFromRegion } from "src/utils/getZoomFromRegion";
import { getStageFromZoom, getZoomFromStage } from "src/utils/getZoomFromStage";
import { sortAreas } from "src/utils/sortAreas";
import { sortRocks } from "src/utils/sortRocks";
import AreaResultsItem from "../common/ResultsItem/AreaResultsItem";

type ListUnion = Union.Merge<RockData | AreaData | RegionData>;

const polandRegion = {
  id: 0,
  attributes: {
    Name: "Polska",
    createdAt: "",
    published_at: "",
    updatedAt: "",
    coordinates: {
      id: 1,
      latitude: 50.36305,
      longitude: 19.83229,
    },
    uuid: "",
    children: { data: [] },
    parent: {
      data: null,
    },
    Cover: {
      Author: "",
      Description: "",
      id: 0,
      Photo: {
        data: {
          id: 0,
          attributes: {
            alternativeText: "",
            caption: "",
            createdAt: "",
            ext: "",
            formats: "",
            hash: "",
            height: "",
            mime: "",
            name: "",
            previewUrl: "",
            provider: "",
            provider_metadata: "",
            size: "",
            updatedAt: "",
            url: "",
            width: "",
          },
        },
      },
    },
  },
};

export default function ResultsList() {
  const { areas, regions, sectors, rocks } = useAreas();
  const [locationArray, setLocationArray] = useState<Partial<AreasList>>([]);
  const [listToRender, setListToRender] = useState<ListUnion[]>([]);
  const [stage, setStage] = useState(0);
  const [selectedRock, setSelectedRock] = useAtom(selectedRockAtom);

  const [bottomSheetGlobalRef, setBottomSheetGlobalRef] =
    useAtom(bottomSheetRefAtom);
  const region = useAtomValue(regionAtom);
  const map = useAtomValue(mapAtom);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const locationRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!region || !areas || !sectors || !regions || !rocks) return;
    const zoom = getZoomFromRegion(region);
    const stage = getStageFromZoom(zoom);
    setStage(stage);
    console.log(stage);
    const newLocationArray: AreasList = [];
    if (stage >= 1) {
      newLocationArray.push(polandRegion);
      newLocationArray.push(sortAreas(region, areas)[0]);
    }
    if (stage >= 2) {
      newLocationArray.push(sortAreas(region, regions)[0]);
    }
    if (stage >= 3) {
      newLocationArray.push(sortAreas(region, sectors)[0]);
    }

    setLocationArray(newLocationArray);

    setTimeout(() => {
      if (locationRef && locationRef.current) {
        locationRef.current.scrollToEnd();
      }
    }, 400);

    if (stage === 0 && areas) {
      const sortedAreas = sortAreas(region, areas);
      setListToRender(sortedAreas.slice(0, 15));
      return;
    }

    if (stage === 1 && regions) {
      const sortedRegions = sortAreas(region, regions);
      setListToRender(sortedRegions.slice(0, 15));
      return;
    }

    if (stage === 2 && sectors) {
      const sortedSectors = sortAreas(region, sectors);
      setListToRender(sortedSectors.slice(0, 15));
      return;
    }

    if (rocks) {
      const sortedRocks = sortRocks(region, rocks);
      setListToRender(sortedRocks.slice(0, 15));
    }
  }, [areas, region, regions, rocks, sectors]);

  useEffect(() => {
    const handleModals = async () => {
      if (selectedRock) {
        await bottomSheetRef.current?.snapToIndex(0);
        await bottomSheetModalRef.current?.present();
        return;
      }
      if (!selectedRock) {
        await bottomSheetModalRef.current?.dismiss();
        await bottomSheetRef.current?.snapToIndex(0);
      }
    };
    handleModals();
  }, [selectedRock]);

  useEffect(() => {
    if (bottomSheetRef.current && !bottomSheetGlobalRef) {
      setBottomSheetGlobalRef(bottomSheetRef);
    }
  }, [bottomSheetRef]);

  const animateTo = async (item: AreaData, stage: number) => {
    const newRegion = getRegionForZoom(
      item.attributes.coordinates.latitude,
      item.attributes.coordinates.longitude,
      getZoomFromStage(stage),
    );
    if (map && map.current) map.current.animateToRegion(newRegion);
    await bottomSheetModalRef.current?.dismiss();
  };

  const bottomSheetSnapPoints = useMemo(() => ["80%"], []);
  const snapPoints = useMemo(() => ["15%", "50%", "86%"], []);

  const renderItem = ({ item, index }: { item: unknown; index: number }) => {
    const isLast = index === listToRender.length - 1;
    if (stage === 0) {
      const itemToRender = item as AreaData;
      return (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <View marginHorizontal='m' mb={isLast ? "6xl" : "l"}>
            <AreaResultsItem
              id={itemToRender.attributes.uuid}
              name={itemToRender.attributes.Name}
              item={itemToRender}
            />
          </View>
        </Animated.View>
      );
    }
    if (stage === 1 || stage === 2) {
      const itemToRender = item as RegionData;
      return (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <View marginHorizontal='m' mb={isLast ? "6xl" : "l"}>
            <AreaResultsItem
              id={itemToRender.attributes.uuid}
              name={itemToRender.attributes.Name}
              item={itemToRender}
            />
          </View>
        </Animated.View>
      );
    }
    const itemToRender = item as RockData;
    return (
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <View marginHorizontal='m' mb={isLast ? "6xl" : "l"}>
          <RockResultsItem
            id={itemToRender.attributes.uuid}
            name={itemToRender.attributes.Name}
            item={itemToRender}
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        style={styleGuide.bottomSheet}
      >
        <View marginHorizontal='m'>
          <Text variant='h3'>Wybrana lokalizacja: </Text>
        </View>
        {locationArray && locationArray?.length > 0 ? (
          <View paddingBottom='s'>
            <ScrollView
              ref={locationRef}
              horizontal
              shouldCancelWhenOutside
              showsHorizontalScrollIndicator={false}
              snapToEnd
            >
              <View
                marginTop='s'
                paddingLeft='l'
                paddingRight='xl'
                flexDirection='row'
                gap='m'
                paddingBottom='m'
              >
                {locationArray.map((item, index) => {
                  const isLast = index === locationArray.length - 1;
                  const animate = () => {
                    if (!item) return;
                    return animateTo(item, index);
                  };
                  return (
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      onPress={animate}
                      key={item?.attributes?.Name}
                    >
                      <View
                        key={item?.attributes?.uuid}
                        borderWidth={isLast ? 0 : 1}
                        borderRadius={99}
                        paddingVertical='s'
                        paddingHorizontal='l'
                        backgroundColor={
                          isLast ? "backgroundTertiary" : "backgroundScreen"
                        }
                        borderColor='backgroundTertiary'
                      >
                        <Text variant='body'>{item?.attributes?.Name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
            <LinearGradient
              colors={["rgb(255, 255, 255)", "rgba(255, 255, 255, 0)"]}
              start={[0, 1]}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: 60,
                zIndex: 40,
                elevation: 40,
              }}
            />
            <LinearGradient
              colors={["rgba(255, 255, 255, 0)", "rgb(255, 255, 255)"]}
              start={[0, 1]}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                width: 40,
                zIndex: 40,
                elevation: 40,
              }}
            />
          </View>
        ) : (
          <View
            marginTop='s'
            paddingLeft='l'
            paddingRight='xl'
            flexDirection='row'
            gap='m'
            paddingBottom='s'
          >
            <View
              borderRadius={99}
              paddingVertical='s'
              paddingHorizontal='l'
              backgroundColor='backgroundTertiary'
            >
              <Text variant='body'>{"Przybliż coś gdzieś mapę ;) "}</Text>
            </View>
          </View>
        )}
        <View flex={1} mt='xs'>
          <FlashList
            data={listToRender.slice(0, 5)}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            estimatedItemSize={200}
            contentContainerStyle={{
              paddingBottom: 140,
              paddingTop: 16,
            }}
          />
        </View>
      </BottomSheet>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={bottomSheetSnapPoints}
        onDismiss={() => setSelectedRock(null)}
        style={styleGuide.bottomSheet}
        backdropComponent={Backdrop}
      >
        <RockInfoExpanded />
      </BottomSheetModal>
    </>
  );
}
