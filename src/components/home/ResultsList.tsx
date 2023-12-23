import BottomSheet, {
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import ResultsItem from "src/components/common/ResultsItem/RockResultsItem";
import RockInfoExpanded from "src/components/home/RockInfoExpanded";
import Backdrop from "../common/Backdrop";
import Text from "../ui/Text";
import View from "../ui/View";

import { useAreas } from "src/hooks/useAreas";
import { AreaData } from "src/services/rocks";
import {
  AreasList,
  listToRenderAtom,
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

export default function ResultsList() {
  const { areas, regions, sectors, rocks } = useAreas();
  const [locationArray, setLocationArray] = useState<AreasList>([]);
  const [selectedRock, setSelectedRock] = useAtom(selectedRockAtom);
  const [listToRender, setListToRender] = useAtom(listToRenderAtom);
  const region = useAtomValue(regionAtom);
  const map = useAtomValue(mapAtom);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    const zoom = getZoomFromRegion(region);
    const stage = getStageFromZoom(zoom);
    const newLocationArray: AreasList = [];
    if (stage >= 1 && areas) {
      newLocationArray.push(sortAreas(region, areas)[0]);
    }
    if (stage >= 2 && regions) {
      newLocationArray.push(sortAreas(region, regions)[0]);
    }
    if (stage >= 3 && sectors) {
      newLocationArray.push(sortAreas(region, sectors)[0]);
    }
    setLocationArray(newLocationArray);

    if (rocks) {
      const sortedRocks = sortRocks(region, rocks);
      setListToRender(sortedRocks);
    }
  }, [region]);

  useEffect(() => {
    if (selectedRock) {
      bottomSheetRef.current?.collapse();
      bottomSheetModalRef.current?.present();
      return;
    }
    if (!selectedRock) {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [selectedRock]);

  const animateTo = (item: AreaData, stage: number) => {
    const newRegion = getRegionForZoom(
      item.attributes.coordinates.latitude,
      item.attributes.coordinates.longitude,
      getZoomFromStage(stage),
    );
    if (map && map.current) map.current.animateToRegion(newRegion);
  };

  const bottomSheetSnapPoints = useMemo(() => ["70%"], []);
  const snapPoints = useMemo(() => ["14%", "45%", "97%"], []);

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        style={styleGuide.bottomSheet}
      >
        <View flexDirection='row' padding='s' minHeight={60}>
          {locationArray?.length > 0 &&
            locationArray.map((item, index) => (
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => animateTo(item, index)}
                key={item?.attributes?.Name}
              >
                {index !== 0 && (
                  <View marginHorizontal='3xs'>
                    <Text>-</Text>
                  </View>
                )}
                <Text>{item?.attributes?.Name}</Text>
              </TouchableOpacity>
            ))}
        </View>
        <BottomSheetScrollView>
          <View paddingTop='m' width='100%' height='100%' paddingHorizontal='s'>
            {Array.isArray(listToRender) &&
              listToRender.length >= 1 &&
              listToRender
                .slice(0, 10)
                .map((item) => (
                  <ResultsItem
                    id={item.attributes.uuid}
                    name={item.attributes.Name}
                    key={item.attributes.Name}
                    item={item}
                  />
                ))}

            {Array.isArray(listToRender) && listToRender.length > 2 && (
              <Text>
                Lista wyświetla max. 10 wyników. Przesuń widok na mapie zeby
                wyszukać w innym obszarze.
              </Text>
            )}
          </View>
        </BottomSheetScrollView>
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
