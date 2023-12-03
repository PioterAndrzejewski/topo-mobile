import React, { useEffect, useState, useMemo, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useAtom, useAtomValue } from "jotai";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";

import ResultsItem from "../common/ResultsItem/RockResultsItem";

import { useAreas } from "../../hooks/useAreas";
import { AreaData, RockData } from "../../services/rocks";
import { regionAtom, AreasList, listToRenderAtom } from "../../store/results";
import { calculateDistance } from "../../utils/calculateDistance";
import { getStageFromZoom } from "../../utils/getZoomFromStage";
import { getZoomFromRegion } from "../../utils/getZoomFromRegion";
import { getRegionForZoom } from "../../utils/getRegionForZoom";
import { getZoomFromStage } from "../../utils/getZoomFromStage";
import { mapAtom, selectedRockAtom } from "../../store/results";
import RockInfoExpanded from "./RockInfoExpanded";
import { sortAreas } from "../../utils/sortAreas";
import { sortRocks } from "../../utils/sortRocks";

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

  const bottomSheetSnapPoints = useMemo(() => ["25%", "40%"], []);
  const snapPoints = useMemo(() => ["12%", "45%", "97%"], []);

  return (
    <>
      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <View style={styles.location}>
          {locationArray?.length > 0 &&
            locationArray.map((item, index) => (
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => animateTo(item, index)}
                key={item?.attributes?.Name}
              >
                {index !== 0 && <Text style={{ marginHorizontal: 2 }}>-</Text>}
                <Text>{item?.attributes?.Name}</Text>
              </TouchableOpacity>
            ))}
        </View>
        <BottomSheetScrollView>
          <View style={styles.container}>
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
        index={1}
        snapPoints={bottomSheetSnapPoints}
        onDismiss={() => setSelectedRock(null)}
      >
        <RockInfoExpanded />
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    width: "100%",
    height: "100%",
    paddingHorizontal: 12,
  },
  location: {
    flexDirection: "row",
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 12,
    minHeight: 60,
  },
});
