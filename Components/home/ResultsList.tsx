import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  Text,
  Button,
} from "react-native";
import { useAtom, useAtomValue, useStore } from "jotai";
import Animated, { JumpingTransition } from "react-native-reanimated";
import { Region } from "react-native-maps";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import ResultsItem from "../../Components/common/ResultsItem";

import { useAreas } from "../../hooks/useAreas";
import { AreaData, RegionData } from "../../services/rocks";
import {
  regionAtom,
  resultsStageAtom,
  zoomAtom,
  AreasList,
  listToRenderAtom,
} from "../../store/results";
import { calculateDistance } from "../../utils/calculateDistance";
import { getStageFromZoom } from "../../utils/getZoomFromStage";
import { getZoomFromRegion } from "../../utils/getZoomFromRegion";
import { getRegionForZoom } from "../../utils/getRegionForZoom";
import { getZoomFromStage } from "../../utils/getZoomFromStage";
import { mapAtom, selectedRockAtom } from "../../store/results";
import { HomeScreenNavigationProp } from "../../types/type";

const sortAreas = (region: Region, areas: RegionData[]) => {
  if (!areas || areas.length < 1 || !Array.isArray(areas)) return [];
  const shallowCopy = [...areas];
  if (!shallowCopy || !Array.isArray(shallowCopy) || shallowCopy?.length < 1)
    return [];
  return shallowCopy.sort((a, b) => {
    return (
      calculateDistance(region, a.attributes.coordinates) -
      calculateDistance(region, b.attributes.coordinates)
    );
  });
};

export default function ResultsList() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { areas, regions, sectors, rocks } = useAreas();
  const region = useAtomValue(regionAtom);
  const [listToRender, setListToRender] = useAtom(listToRenderAtom);
  const [rocksOnly, setRocksOnly] = useState(false);
  const [locationArray, setLocationArray] = useState<AreasList>([]);
  const map = useAtomValue(mapAtom);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedRock, setSelectedRock] = useAtom(selectedRockAtom);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const stage = useMemo(() => {
    const zoom = getZoomFromRegion(region);
    return getStageFromZoom(zoom);
  }, [region]);

  useEffect(() => {
    const locationArray: AreasList = [];
    if (stage >= 1 && areas) {
      locationArray.push(sortAreas(region, areas)[0]);
    }
    if (stage >= 2 && regions) {
      locationArray.push(sortAreas(region, regions)[0]);
    }
    if (stage >= 3 && sectors) {
      locationArray.push(sortAreas(region, sectors)[0]);
    }
    setLocationArray(locationArray);

    if (rocksOnly && rocks) {
      const sortedAreas = sortAreas(region, rocks);
      return setListToRender(sortedAreas);
    }
    if (stage === 0 && areas) {
      return setListToRender(sortAreas(region, areas));
    }
    if (stage === 1 && regions)
      return setListToRender(
        sortAreas(region, regions).filter(
          (region) =>
            region?.attributes?.parent?.data?.attributes?.uuid ===
            locationArray[locationArray.length - 1]?.attributes?.uuid,
        ),
      );
    if (stage === 2 && sectors)
      return setListToRender(
        sortAreas(region, sectors).filter(
          (sector) =>
            sector?.attributes?.parent?.data?.attributes?.uuid ===
            locationArray[locationArray.length - 1]?.attributes?.uuid,
        ),
      );
    if (stage === 3 && rocks) {
      const sortedAreas = sortAreas(region, rocks);
      if (locationArray.length < 1) return setListToRender(sortedAreas);
      return setListToRender(
        sortedAreas.filter(
          (rock) =>
            rock?.attributes?.parent?.data?.attributes?.uuid ===
            locationArray[locationArray.length - 1]?.attributes?.uuid,
        ),
      );
    }
  }, [region, rocksOnly]);

  useEffect(() => {
    console.log("zmienilo sie");
    console.log(selectedRock);
    if (selectedRock) {
      bottomSheetRef.current?.collapse();
      bottomSheetModalRef.current?.present();
      return;
    }
    if (!selectedRock) {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [selectedRock]);

  const handleOpenRock = () => {
    navigation.navigate("Rock", {
      id: selectedRock,
    });
    setSelectedRock(null);
  };

  const handleRocksOnlyButton = () => {
    setRocksOnly((prev) => !prev);
  };

  const animateTo = (item: AreaData, stage: number) => {
    const newRegion = getRegionForZoom(
      item.attributes.coordinates.latitude,
      item.attributes.coordinates.longitude,
      getZoomFromStage(stage),
    );
    if (map && map.current) map.current.animateToRegion(newRegion);
  };

  const bottomSheetSnapPoints = useMemo(() => ["25%", "40%"], []);
  const snapPoints = useMemo(() => ["10%", "35%", "100%"], []);

  return (
    <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", paddingHorizontal: 12 }}>
          {locationArray.map((item, index) => (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => animateTo(item, index)}
            >
              {index !== 0 && <Text style={{ marginHorizontal: 2 }}>-</Text>}
              <Text>{item?.attributes?.Name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={handleRocksOnlyButton}
            style={
              rocksOnly
                ? { ...styles.buttonContainer, ...styles.buttonContainerActive }
                : {
                    ...styles.buttonContainer,
                  }
            }
          >
            <Text>Tylko skały {rocksOnly ? "x" : " "}</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView>
          {listToRender.length < 1 ? (
            <Text>Brakuje wyników. Musisz je pobrać w trybie offline!</Text>
          ) : (
            <Animated.FlatList
              data={listToRender.slice(0, 10)}
              renderItem={({ item }) => (
                <ResultsItem
                  id={item.attributes.uuid}
                  name={item.attributes.Name}
                  key={item.attributes.uuid}
                  item={item}
                  isRock={rocksOnly || stage === 3}
                  animateTo={animateTo}
                  itemStage={stage + 1}
                />
              )}
            />
          )}
          {listToRender.length > 2 && (
            <Text>
              Lista wyświetla max. 10 wyników. Przesuń widok na mapie zeby
              wyszukać w innym obszarze.{" "}
            </Text>
          )}
        </SafeAreaView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={bottomSheetSnapPoints}
          onDismiss={() => setSelectedRock(null)}
        >
          <View>
            <Text>Awesome 🎉</Text>
            <Text>Selected rock: {selectedRock}</Text>
            <TouchableOpacity onPress={handleOpenRock}>
              <Text>Otwórz skałoplan</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  controls: {
    marginBottom: 14,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonContainerActive: {
    borderWidth: 2,
  },
});
