import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";

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
  const [bottomSheetGlobalRef, setBottomSheetGlobalRef] =
    useAtom(bottomSheetRefAtom);
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
    const handleModals = async () => {
      if (selectedRock) {
        await bottomSheetRef.current?.forceClose();
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
    bottomSheetRef?.current?.collapse();
  };

  const bottomSheetSnapPoints = useMemo(() => ["80%"], []);
  const snapPoints = useMemo(() => ["15%", "80%"], []);

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
        {locationArray && locationArray?.length > 0 && (
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
                  <View key={item?.attributes?.uuid}>
                    <OverlayCardView
                      key={item?.id + index + item?.attributes.uuid}
                    >
                      <TouchableOpacity
                        style={{ flexDirection: "row" }}
                        onPress={() =>
                          animateTo(item, index === 0 ? 0 : index + 1)
                        }
                        key={item?.attributes?.Name}
                      >
                        <Text variant='h3' color='textSecondary'>
                          {item?.attributes?.Name}
                        </Text>
                      </TouchableOpacity>
                    </OverlayCardView>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
        <View marginHorizontal='m' marginTop='s' marginBottom='m'>
          <Text variant='h3'>Skały w poblizu:</Text>
        </View>
        <View flex={1}>
          <FlatList
            data={listToRender.slice(0, 5)}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View marginHorizontal='m'>
                  <ResultsItem
                    id={item.attributes.uuid}
                    name={item.attributes.Name}
                    item={item}
                  />
                </View>
              );
            }}
          />
        </View>
        {Array.isArray(listToRender) && listToRender.length > 5 && (
          <Text>
            Lista wyświetla max. 5 wyników. Przesuń widok na mapie zeby wyszukać
            w innym obszarze.
          </Text>
        )}
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
