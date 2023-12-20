import { atom } from 'jotai';
import { RefObject } from 'react';
import MapView, { Region } from 'react-native-maps';

import { RegionData, RockData } from 'src/services/rocks';

export const startRegion = {
  latitude: 50.36305,
  longitude: 19.83229,
  latitudeDelta: 1.5,
  longitudeDelta: 1.5,
}

export type AreasList = RegionData[];

export const resultsStageAtom = atom<number>(0)
export const regionAtom = atom<Region>(startRegion);
export const mapAtom = atom<RefObject<MapView> | null >(null);
export const listToRenderAtom = atom<RockData[]>([]);
export const selectedRockAtom = atom<string | null>(null)