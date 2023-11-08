import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  Text,
  Button,
} from "react-native";
import { useAtom, useAtomValue, useStore } from "jotai";
import Animated from "react-native-reanimated";
import { Region } from "react-native-maps";

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
import { TouchableOpacity } from "react-native-gesture-handler";
import { getStageFromZoom } from "../../utils/getZoomFromStage";
import { getZoomFromRegion } from "../../utils/getZoomFromRegion";
import { getRegionForZoom } from "../../utils/getRegionForZoom";
import { getZoomFromStage } from "../../utils/getZoomFromStage";
import { mapAtom } from "../../store/results";

type ResultsListProps = {
  onScroll: () => void;
};

const sortAreas = (region: Region, areas: RegionData[]) => {
  if (!areas || areas.length < 1) return [];
  const shallowCopy = [...areas];
  return shallowCopy.sort((a, b) => {
    return (
      calculateDistance(region, a.attributes.coordinates) -
      calculateDistance(region, b.attributes.coordinates)
    );
  });
};

export default function ResultsList({ onScroll }: ResultsListProps) {
  const { areas, regions, sectors, rocks } = useAreas();
  const region = useAtomValue(regionAtom);
  const [listToRender, setListToRender] = useAtom(listToRenderAtom);
  const [rocksOnly, setRocksOnly] = useState(false);
  const [locationArray, setLocationArray] = useState<AreasList>([]);
  const map = useAtomValue(mapAtom);

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
      console.log(
        sortAreas(region, rocks)[0].attributes.parent.data.attributes.uuid,
      );
      return setListToRender(
        sortAreas(region, rocks).filter(
          (rock) =>
            rock.attributes.parent.data.attributes.uuid ===
            locationArray[locationArray.length - 1].attributes.uuid,
        ),
      );
    }
    if (stage === 0 && areas) {
      return setListToRender(sortAreas(region, areas));
    }
    if (stage === 1 && regions)
      return setListToRender(
        sortAreas(region, regions).filter(
          (rock) =>
            rock.attributes.parent.data.attributes.uuid ===
            locationArray[locationArray.length - 1].attributes.uuid,
        ),
      );
    if (stage === 2 && sectors)
      return setListToRender(
        sortAreas(region, sectors).filter(
          (rock) =>
            rock.attributes.parent.data.attributes.uuid ===
            locationArray[locationArray.length - 1].attributes.uuid,
        ),
      );
    if (stage === 3 && rocks)
      return setListToRender(
        sortAreas(region, rocks).filter(
          (rock) =>
            rock.attributes.parent.data.attributes.uuid ===
            locationArray[locationArray.length - 1].attributes.uuid,
        ),
      );
  }, [region, rocksOnly]);

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

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", paddingHorizontal: 12 }}>
        {locationArray.map((item, index) => (
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => animateTo(item, index)}
          >
            {index !== 0 && <Text style={{ marginHorizontal: 2 }}>-</Text>}
            <Text>{item.attributes.Name}</Text>
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
            data={listToRender}
            onScroll={onScroll}
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
      </SafeAreaView>
    </View>
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
