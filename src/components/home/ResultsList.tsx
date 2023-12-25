import BottomSheet, {
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import Backdrop from "src/components/common/Backdrop";
import ResultsItem from "src/components/common/ResultsItem/RockResultsItem";
import RockInfoExpanded from "src/components/home/rock/RockInfoExpanded";
import OverlayCardView from "src/components/ui/OverlayCardView";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useAreas } from "src/hooks/useAreas";
import { AreaData } from "src/services/rocks";
import {
  AreasList,
  bottomSheetRefAtom,
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
  const setBottomSheetGlobalRef = useSetAtom(bottomSheetRefAtom);
  const region = useAtomValue(regionAtom);
  const map = useAtomValue(mapAtom);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (!region || !areas || !sectors || !regions || !rocks) return;
    const zoom = getZoomFromRegion(region);
    const stage = getStageFromZoom(zoom);
    const newLocationArray: AreasList = [];

    newLocationArray.push(sortAreas(region, areas)[0]);
    if (stage >= 2) {
      newLocationArray.push(sortAreas(region, regions)[0]);
    }
    if (stage >= 3) {
      newLocationArray.push(sortAreas(region, sectors)[0]);
    }

    setLocationArray(newLocationArray);

    if (rocks) {
      const sortedRocks = sortRocks(region, rocks);
      setListToRender(sortedRocks);
    }
  }, [areas, region, regions, rocks, sectors]);

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

  useEffect(() => {
    if (bottomSheetRef.current) {
      setBottomSheetGlobalRef(bottomSheetRef);
    }
  }, [bottomSheetRef]);

  const animateTo = (item: AreaData, stage: number) => {
    const newRegion = getRegionForZoom(
      item.attributes.coordinates.latitude,
      item.attributes.coordinates.longitude,
      getZoomFromStage(stage),
    );
    if (map && map.current) map.current.animateToRegion(newRegion);
    bottomSheetModalRef.current?.dismiss();
    bottomSheetRef?.current?.collapse();
  };

  const bottomSheetSnapPoints = useMemo(() => ["80%"], []);
  const snapPoints = useMemo(() => ["15%", "45%", "80%"], []);

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        style={styleGuide.bottomSheet}
      >
        <View>
          {locationArray?.length > 0 && (
            <>
              <View marginHorizontal='m'>
                <Text variant='h3'>Wybrana lokalizacja: </Text>
              </View>
              <View
                borderBottomWidth={1}
                borderBottomColor='backgroundSecondary'
                paddingBottom='s'
              >
                <ScrollView
                  horizontal
                  shouldCancelWhenOutside
                  showsHorizontalScrollIndicator={false}
                >
                  <View
                    marginTop='m'
                    paddingHorizontal='m'
                    flexDirection='row'
                    gap='m'
                    paddingBottom='m'
                  >
                    {locationArray.map((item, index) => (
                      <OverlayCardView>
                        <TouchableOpacity
                          style={{ flexDirection: "row" }}
                          onPress={() => animateTo(item, index)}
                          key={item?.attributes?.Name}
                        >
                          <Text variant='h3' color='textSecondary'>
                            {item?.attributes?.Name}
                          </Text>
                        </TouchableOpacity>
                      </OverlayCardView>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </>
          )}
        </View>
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <View marginHorizontal='m' marginTop='s' marginBottom='m'>
            <Text variant='h3'>Skały w poblizu:</Text>
          </View>
          <View width='100%' height='100%' paddingHorizontal='m'>
            {Array.isArray(listToRender) &&
              listToRender.length >= 1 &&
              listToRender
                .slice(0, 5)
                .map((item) => (
                  <ResultsItem
                    id={item.attributes.uuid}
                    name={item.attributes.Name}
                    key={item.attributes.Name}
                    item={item}
                  />
                ))}

            {Array.isArray(listToRender) && listToRender.length > 5 && (
              <Text>
                Lista wyświetla max. 5 wyników. Przesuń widok na mapie zeby
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
