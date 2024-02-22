import BottomSheet from "@gorhom/bottom-sheet";
import { atom } from "jotai";
import { RefObject } from "react";
import MapView, { Region } from "react-native-maps";

import { RegionData } from "src/services/rocks";

export const startRegion = {
  latitude: 50.36305,
  longitude: 19.83229,
  latitudeDelta: 1.5,
  longitudeDelta: 1.5,
};

export type AreasList = RegionData[];

export const regionAtom = atom<Region>(startRegion);
export const mapAtom = atom<RefObject<MapView> | null>(null);
export const selectedRockAtom = atom<string | null>(null);
export const bottomSheetRefAtom = atom<RefObject<BottomSheet> | null>(null);
